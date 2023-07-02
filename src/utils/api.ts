import { IPatchUserForm } from '../constants/constants';

import {
  ingredientsUrl,
  userUrl,
  tokenUrl,
} from '../constants/constants';
import { getCookie, setCookie } from './utils';

interface IOptions {
  method: 'POST' | 'PATCH' | 'GET';
  headers: {
    'Accept'?: string;
    'Content-type'?: string;
    'Authorization'?: string;
  };
  body?: string;
};

function checkResponse <T>(res: Response): Promise<T> | undefined {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function request(url: string, options: IOptions): any { // any
  return fetch(url, options).then(checkResponse)
};

// export function request(url: string, options: IOptions): any { 
//   console.log(fetch, options);
//   try {
//     const res = await fetch(url, options); //делаем запрос
//     return await checkResponse(res);
//   } catch (err) {
//     if (err.message === "jwt expired") {
//       console.log("working");

//       const refreshData = refreshToken(); //обновляем токен
//       console.log(refreshData);
//       setCookie(
//         'accessToken',
//         refreshData.accessToken.split('Bearer ')[1],
//       );
//       setCookie(
//         'refreshToken',
//         refreshData.refreshToken,
//       );
//       options.headers.Authorization = refreshData.accessToken;
//       const res = await fetch(url, options); //вызываем перезапрос данных
//       return await checkResponse(res);
//     } else {
//       return Promise.reject(err);
//     }
//   }
// };

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
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    }
  })
};

export function patchUserFetch(data: IPatchUserForm) {
  return request(userUrl, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + getCookie('accessToken')
    },
    body: JSON.stringify(data)
  })
};
