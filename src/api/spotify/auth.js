import axios from 'axios';

const req = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_PROD_SPOTIFY_ADDY
      : process.env.VUE_APP_DEV_SPOTIFY_ADDY
});

export default {
  getAccessToken: function() {
    return req.get('/');
  }
  // getUserAuthURL: function() {
  //   return req.get('login');
  // },

  // refreshToken: function(refresh_token) {
  //   return req.get(`refresh_token?refresh_token=${refresh_token}`);
  // }
};
