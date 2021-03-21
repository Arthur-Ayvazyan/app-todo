import decode from 'jwt-decode';
import { store } from '../store/store';
import { SIGN_OUT } from '../store/actionTypes';

export function checkLoginStatus() { return !!localStorage.getItem('token') }

export function requestWithoutToken(url, method = 'GET', body) {
  const config = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config)
    .then(async (response) => {
      const res = await response.json();

      if (response.status >= 400 && response.status < 600) {
        if (res.error) {
          throw res.error;
        }
      }

      return res;
    });
};


export function saveToken(token) {
  localStorage.setItem('token', JSON.stringify(token));
}

export function removeToken(token) {
  localStorage.removeItem(token);
}

export function getJWT() {
  const token = localStorage.getItem('token');
  if (token) {
    return JSON.parse(token).jwt;
  }
}

export const getToken = () => {

  const token = localStorage.getItem('token');

  if (token) {
    const parsed = JSON.parse(token);
    const decoded = decode(parsed.jwt);
    const now = new Date().getTime() / 1000;

    if (decoded.exp - now > 60) {
      return Promise.resolve(parsed.jwt);
    }

    else {
      const apiHost = process.env.REACT_APP_API_HOST;
      return requestWithoutToken(`${apiHost}/user/${decoded.userId}/token`, 'PUT', {
        refreshToken: parsed.refreshToken
      })
        .then(token => {
          saveToken(token);
          return token.jwt;
        }).catch(() => {
          store.dispatch({ type: SIGN_OUT })
        })
    }
  }

  else {
    store.dispatch({ type: SIGN_OUT });
  }
}