// const NORMA_API = "https://norma.nomoreparties.space/api";

export const BASE_URL = "https://norma.nomoreparties.space/api";


const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

const request = async (endpoint, options) => {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(`${BASE_URL}/${endpoint}`, options).then(checkResponse)
}

export const getIngredientsRequest = async () => {
  return request('ingredients');
};

export const createOrderRequest = async (ingredientIds) => {
  return request('orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "ingredients": ingredientIds
    })
  });
};
