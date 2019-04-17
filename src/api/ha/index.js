import axios from 'axios';

const haBaseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.VUE_APP_PROD_HA_ADDY
    : process.env.VUE_APP_PROD_HA_ADDY;

const req = axios.create({
  baseURL: haBaseUrl,
  headers: {
    'x-ha-access': process.env.VUE_APP_HA_TOKEN
  }
});

req.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

// private methods
const postService = async (entity_id, domain, service, data) => {
  console.log(
    `calling /api/services/${domain}/${service} \nwith \n    ${data}`
  );
  return req.post(`/api/services/${domain}/${service}`, data);
};

export default {
  getState(entity_id) {
    return req.get(`/api/states/${entity_id}`);
  },
  getStates() {
    return req.get('/api/states');
  },
  // music
  getSpeaker(speakerId) {
    return this.getState(speakerId);
  },
  getSpeakers() {
    return this.getStates().then(results => {
      // this isn't exactly right, speakers are a subset of `media_players`
      return results.find(filter =>
        filter.entity_id.startsWith('media_player')
      );
    });
  },
  powerSpeakerOn(speakerId) {
    return postService(speakerId, 'media_player', 'turn_on', {
      entity_id: speakerId
    });
  },
  powerSpeakerOff(speakerId) {
    return postService(speakerId, 'media_player', 'turn_off', {
      entity_id: speakerId
    });
  },
  async setSpeakerSource(speakerId, source) {
    return postService(speakerId, 'media_player', 'select_source', {
      entity_id: speakerId,
      source: source
    });
  },
  getLockStatus() {
    return this.getState('lock.front_door');
  },
  lockDoor() {
    return postService('lock.front_door', 'lock', 'lock', {
      entity_id: 'lock.front_door'
    });
  },
  unlockDoor() {
    return postService('lock.front_door', 'lock', 'unlock', {
      entity_id: 'lock.from_door'
    });
  }
};
