import axios from 'axios';

const req = axios.create({
  baseURL: 'https://red.beavners.com'
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
