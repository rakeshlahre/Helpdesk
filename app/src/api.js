import axios from 'axios';
import router from './router';
import toastr from 'toastr';

import url from "./config/AppConfig";

const API_URL = url.API_URL;

const errorHandler = function (error) {
  if (error.response && error.response.status === 401) {
    router.replace('/login');
  }

  if (error.response.status === 400) {
    const {errors, error: errorStr} = error.response.data;
    let message;

    if (Array.isArray(errors)) {
      message = errors.reduce((res, error) => `${res} ${error.msg}`, '');
    } else if (typeof errorStr === 'string') {
      message = errorStr;
    }

    console.log(message);

    toastr.error(message || 'error');
  }
  throw error;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:8081" 
  },
  withCredentials: true,
  timeout: 10000
});

const get = function (uri, headers = {}) {
  return api.get(uri, headers)
    .then(res => res.data)
    .catch(errorHandler);
};

const post = (uri, data, headers = {}) => {
  return api.post(uri, data, headers)
    .then(res => res.data)
    .catch(errorHandler);
};

export default {
  onUserLogin (username, password) {
    return post('auth/login', {username, password});
  },
  fetchUser () {
    return get('sessions/me');
  },
  onUserRegister(username, password) {
    return post('auth/register', {username, password});
  },
  onUserLogout() {
    return post('auth/logout');
  },

  connectTwitter() {
    return get('auth/twitter-login');
  },

  getUserTweets() {
    return get('twitter/user_timeline');
  }
};