import axios, { InternalAxiosRequestConfig } from "axios";

export const BASE_URL = "http://127.0.0.1:8000";

const $api = axios.create({
  baseURL: BASE_URL,
  headers: {},
});

$api.interceptors.request.use(async (config: InternalAxiosRequestConfig) => {
  const moddule = await import('../state/state')
  
  const { user } = moddule.store.getState();
  if(user.token){
    config.headers!.Authorization = `Token ${user.token}`;
  }
  return config;
});

export default $api;
