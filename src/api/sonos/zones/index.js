import axios from './../axios';

export default {
  get() {
    return axios.get('/zones');
  },

  // /Kitchen/join/Office This will join the Kitchen player to the group that Office currently belong to.
  join(zone, target) {
    return axios.get(`${zone}/join/${target}`);
  },

  // /Kitchen/leave/Kitchen will leave any group it was part of and become a standalone player.
  leave(zone, target) {
    return axios.get(`${zone}/leave/${target}`);
  }
};
