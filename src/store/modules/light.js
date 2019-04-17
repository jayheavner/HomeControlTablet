import { LightModel, ZoneModel } from '@/models';
import { upsertArray } from '@/utils';
import api from '@/api';

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
  async initialize({ commit, zone }) {
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

    // const lights = buildList(LightModel, msg, 'group.house_lights');
    debugger;
    commit('SET_LIGHTS', lights);

    // const zones = buildList(ZoneModel, msg, 'group.lights_view');
    commit('SET_ZONES', zones);
    commit('SET_ZONE', state.zones.find(z => z.entity_id === zone));
  },
  updateLight({ commit }, light) {
    if (light.event !== undefined) light = new LightModel(light.event.data);
    let lights = upsertArray(
      [...state.lights],
      { entity_id: light.entity_id },
      light
    );
    debugger;
    commit('SET_LIGHTS', lights);
  },
  changeZone({ commit }, entity_id) {
    debugger;
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
