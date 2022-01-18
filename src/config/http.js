import axios from 'axios';

const defaultConfig = {
  baseURL: 'https://merkur.re4m.com',
  // baseURL: process.env.API_URL,
  timeout: 5000,
  withCredentials: true,
};

var instance = null;

export const initializeAxios = config => {
  instance = axios.create(Object.assign(defaultConfig, config));
};

const getAxiosInstance = () => {
  if (!instance) {
    initializeAxios();
  }
  return instance;
};

export default getAxiosInstance;
