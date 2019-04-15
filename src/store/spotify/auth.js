const state = {
  accessToken: ''
};

const mutations = {
  SET_ACCESS_TOKEN(state, token) {
    state.accessToken = token;
  }
};

const actions = {
  logout: function() {
    let script = document.createElement('script');

    script.src = 'https://www.spotify.com/logout/';
    document.getElementById('app').appendChild(script);

    window.localStorage.clear();
    window.sessionStorage.clear();

    setTimeout(function() {
      location.reload();
    }, 1000);
  },

  async setAccessToken({ commit }, token) {
    commit('SET_ACCESS_TOKEN', token);
  }
};

const module = {
  namespaced: true,
  state,
  mutations,
  actions
};

export default module;
