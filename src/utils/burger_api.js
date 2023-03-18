const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((error) => Promise.reject(error));
};

export function getIngredients() {
  const url = "https://norma.nomoreparties.space/api/ingredients";
  return fetch(url).then(checkResponse);
};

