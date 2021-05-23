import axios from 'axios'

import config from './../config/config'

const baseURL = config.BASE_URL ? `https://${config.BASE_URL}/` : 'https://api.openweathermap.org/'

const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: { 'Accept': 'application/json' }
});
  
export default instance