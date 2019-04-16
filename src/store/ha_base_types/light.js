import router from '@/router';
import api from '@/api';
import { LightModel, ZoneModel } from '@/models';
import { upsertArray } from '@/utils';

const state = {
  lights: null,
  zones: {},
  selectedZone: {}
};

const getters = {
  getLights: state => state.lights,
  getZones: state => state.zones,
  getSelectedZone: state => state.selectedZone
};

const mutations = {
  SET_LIGHTS(state, lights) {
    debugger;
    state.lights = lights;
  },
  SET_ZONES(state, zones) {
    state.zones = zones;
  },
  SET_ZONE(state, zone) {
    state.selectedZone = zone;
  }
};

const actions = {
  async initialize({ state, commit }, zone) {
    console.log('%cLight Initialize');
    const all = await api.ha.getStates();
    const zones = buildList(
      ZoneModel,
      await api.ha.getState('group.lights_view'),
      all
    );
    const lights = buildList(
      LightModel,
      await api.ha.getState('group.house_lights'),
      all
    );

    debugger;
    commit('SET_LIGHTS', lights);

    commit('SET_ZONES', zones);

    // right now a default call to lights renders the first zone in the list
    // todo: tie this to the device in the room
    if (zone === undefined) router.push(`/light/${state.zones[0].entity_id}`);
    else commit('SET_ZONE', state.zones.find(z => z.entity_id === zone));
  },
  updateStateChange({ commit }, light) {
    light = new LightModel(light.event.data);
    let lights = upsertArray(
      [...state.lights],
      { entity_id: light.entity_id },
      light
    );
    debugger;
    commit('SET_LIGHTS', lights);
  },
  updateFromDashboard({ commit }, light) {
    light = new LightModel(light);
    let lights = upsertArray(
      [...state.lights],
      { entity_id: light.entity_id },
      light
    );
    debugger;
    commit('SET_LIGHTS', lights);
  },
  update({ commit }, light) {
    if (light.data !== undefined) light = new LightModel(light.data);
    let lights = upsertArray(
      [...state.lights],
      { entity_id: light.entity_id },
      light
    );
    debugger;
    commit('SET_LIGHTS', lights);
  },
  changeZone({ commit }, entity_id) {
    commit('SET_ZONE', state.zones.find(z => z.entity_id === entity_id));
  }
};

const buildList = (type, entities, allEntities) => {
  let list = [];
  entities.data.attributes.entity_id.forEach(entity => {
    const result = allEntities.data.find(all => all.entity_id === entity);
    var o = new type(result);
    list.push(o);
  });
  return list;
};

const module = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default module;
