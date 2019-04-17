import axios from './../axios';

const market = 'US';
const stub = '/me/player';

export default {
  get() {
    return axios.get(stub, { params: { market } });
  },
  currentlyPlaying() {
    return axios.get(`${stub}/currently-playing`, { params: { market } });
  },

  nextTrack(device_id) {
    return axios.post(`${stub}/next`, { device_id });
  },

  previousTrack(device_id) {
    return axios.post(`${stub}/previous`, {
      device_id
    });
  },

  pause(device_id) {
    return axios.put(`${stub}/pause`, {
      device_id
    });
  },

  // play(context_uri, offset = 0, uris, device_id = null) {
  async play(uri, offset = 0, device_id = null) {
    debugger;
    let position_ms = 0;
    if (uri === undefined) {
      const currentlyPlaying = await this.get();
      debugger;
      uri = [currentlyPlaying.data.item.uri];
      device_id = currentlyPlaying.data.device.id;
      position_ms = currentlyPlaying.data.progress_ms;
    }
    let data = {
      offset: {
        position: offset
      },
      position_ms: position_ms
    };
    // uri can be a context_uri (single item) or it can be an array of uris
    if (Array.isArray(uri)) {
      data.uris = uri;
    } else {
      data.context_uri = uri;
    }
    return axios({
      method: 'put',
      url: `${stub}/play`,
      params: { device_id: device_id },
      data: data
      // data: {
      //   offset: {
      //     position: offset
      //   },
      //   uris,
      //   ...(context_uri && { context_uri })
      // }
    });
  },

  volume(volume_percent, device_id) {
    return axios({
      method: 'put',
      url: `${stub}/volume`,
      params: {
        volume_percent,
        device_id
      }
    });
  },

  shuffle(state, device_id) {
    return axios({
      method: 'put',
      url: `${stub}/shuffle`,
      params: {
        state: !state,
        device_id: device_id
      }
    });
  },

  repeat(state, device_id) {
    return axios({
      method: 'put',
      url: `${stub}/repeat`,
      params: {
        state,
        device_id
      }
    });
  },

  seekToPosition(position_ms, device_id) {
    return axios({
      method: 'put',
      url: `${stub}/seek`,
      params: {
        position_ms,
        device_id
      }
    });
  },

  getDevices() {
    return axios.get(`${stub}/devices`);
  },

  transferPlayback(device_ids, play = false) {
    return axios.put(stub, {
      device_ids: [device_ids],
      play: play
    });
  }
};
