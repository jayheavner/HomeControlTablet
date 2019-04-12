import axios from './../axios';

export default {
  state() {
    return axios.get('/state');
  },

  play() {
    return axios.get('/play');
  },

  pause() {
    return axios.get('/pause');
  },

  playPause() {
    return axios.get('/playpause');
  },

  next() {
    return axios.get('/next');
  },

  previous() {
    return axios.get('/previous');
  },

  volume(percentage) {
    return axios.get(`/volume/${percentage}`);
  },

  volumeUp() {
    return axios.get('/volume/+1');
  },

  volumeDown() {
    return axios.get('/volume/-1');
  },

  repeat(state) {
    return axios.get(`/repeat/${state}`);
  },

  shuffle(state) {
    return axios.get(`/shuffle/${state}`);
  },

  crossfade(state) {
    return axios.get(`/crossfade/${state}`);
  }
};
