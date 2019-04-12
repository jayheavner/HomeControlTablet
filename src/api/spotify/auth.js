import axios from 'axios';

const req = axios.create({
  baseURL: 'https://spotify.beavners.com'
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
