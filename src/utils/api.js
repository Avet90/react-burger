import {
  ingredientsUrl,
  userUrl,
  tokenUrl
} from '../constants/constants';
import { getCookie, setCookie } from './utils';

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const request = async (url, options) => {
  console.log(fetch, options);
  try {
    const res = await fetch(url, options); //делаем запрос
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      console.log("working");
      const refreshData = await refreshToken(); //обновляем токен
      console.log(refreshData);
      setCookie(
        'accessToken',
        refreshData.accessToken.split('Bearer ')[1],
      );
      setCookie(
        'refreshToken',
        refreshData.refreshToken,
      );
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //вызываем перезапрос данных
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export async function refreshToken() {
  const res = await fetch(tokenUrl, {
    method: "POST",
    body: JSON.stringify({ token: getCookie('refreshToken') }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return checkResponse(res);
}


export function getDataFromServer() {
  return request(ingredientsUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    }
  })
};

export function getUserFetch() {
  return request(userUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
};

export function patchUserFetch(data) {
  return request(userUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
};
