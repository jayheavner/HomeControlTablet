import axios from 'axios';
import store from '@/store';

let isFetchingToken = false;

const request = axios.create({
  baseURL: 'https://api.spotify.com/v1/'
});

const auth = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_PROD_SPOTIFY_ADDY
      : process.env.VUE_APP_DEV_SPOTIFY_ADDY
});

request.interceptors.request.use(async config => {
  const accessToken = store.state.spotifyAuth.accessToken;
  config.headers.common.Authorization = `Bearer ${accessToken}`;
  return config;
});

request.interceptors.response.use(
  config => {
    console.log(
      `%cSpotify response received - ${config.request.responseURL}`,
      'background-color: blue; color: white;'
    );
    if (
      config.request.responseURL.indexOf('/v1/me/player/') > 0 &&
      config.config.method !== 'get'
    ) {
      debugger;
      store.dispatch('player/setPlayback');
    }
    console.log(config);
    return config;
  },
  async error => {
    if (isFetchingToken) return;
    const { status, data } = error.response;
    const accessTokenResponse = await auth.get('/');
    await store.dispatch(
      'spotifyAuth/setAccessToken',
      accessTokenResponse.data.accessToken
    );
    isFetchingToken = false;
    if (status === 401) location.reload();
    else debugger;
  }
);

export default request;
