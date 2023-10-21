import axios from 'axios';

export const loginSuccess = (user, token) => (dispatch) => {
  document.cookie = `token=${token}; path=/;`;

  dispatch({
    type: 'LOGIN_SUCCESS',
    payload: { user, token },
  });
};

export const setToken = (token) => (dispatch) => {
  dispatch({
    type: 'SET_TOKEN',
    payload: token,
  });
};

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const removeToken = (error) => (dispatch) => {
  document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

  dispatch({
    type: 'REMOVE_TOKEN',
    payload: error
  });
};

export const registerSuccess = (user, token) => (dispatch) => {
  document.cookie = `token=${token}; path=/;`;

  dispatch({
    type: 'REGISTER_SUCCESS',
    payload: { user, token },
  });
};

export const registerFailure = (error) => ({
  type: 'REGISTER_FAILURE',
  payload: error,
});


export const loginUser = (credential, navigate) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3000/api/users/login', credential)
      .then((response) => {
        console.log('Login Success:', response.data);
        dispatch(loginSuccess(response.data.user, response.data.token));
        setCookie('token', response.data);
        navigate('/');
      })
      .catch((err) => {
        console.log('Login Error:', err);
        dispatch(loginFailure(err.response.data.error));
      });
  }
}

export const registerUser = (credentials) => {
  return (dispatch) => {
    axios
      .post('http://localhost:3000/api/users/register', credentials)
      .then((response) => {
        console.log('Registration Success:', response.data);
        dispatch(loginSuccess(response.data.user, response.data.token));
      })
      .catch((err) => {
        console.log('Registration Error:', err);
        dispatch(loginFailure(err.response.data.error));
      });
  }
};

function setCookie(name, value) {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 30);
  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/;`;
}
