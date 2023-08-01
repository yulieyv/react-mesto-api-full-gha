const BASE_URL = "https://api.yamalieva.students.nomoredomains.xyz";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status} ${res.statusText}`);
}

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(checkResponse);
}

export function login(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        //console.log(`Это data.token ${data.token}`);
        return data.token;
      }
    });
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    },
  })
    .then(checkResponse)
    .then((data) => data);
};
