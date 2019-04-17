import axios from 'axios';

const req = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_PROD_RED_ADDY
      : process.env.VUE_APP_PROD_RED_ADDY
});

export default {
  // weather
  getDailyForecast() {
    return req.get('/weather/daily-forecast');
  },
  getWeeklyForecast() {
    return req.get('/weather/weekly-forecast');
  },

  // location
  getUserLocation(user) {
    return req.get('/owntracks/' + user);
  }
};
