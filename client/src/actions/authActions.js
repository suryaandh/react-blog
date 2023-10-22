import axios from 'axios';

export const loginSuccess = (user, token) => (dispatch) => {
  localStorage.setItem('token', token);

  dispatch({
    type: 'LOGIN_SUCCESS',
    payload: { user, token },
  });
};

export const setToken = (token) => (dispatch) => {
  localStorage.setItem('token', token);

  dispatch({
    type: 'SET_TOKEN',
    payload: token,
  });
};

export const loginFailure = (error) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const setUser = (userData) => ({
  type: 'SET_USER',
  payload: userData,
});

export const removeToken = () => (dispatch) => {
  localStorage.removeItem('token');

  dispatch({
    type: 'REMOVE_TOKEN',
  });
};

export const loginUser = (credentials, navigate) => {
  return async (dispatch) => {
    axios
      .post('http://localhost:3000/api/users/login', credentials)
      .then((response) => {
        dispatch(loginSuccess(response.data.user, response.data.token));
        localStorage.setItem('token', response.data.token);
        // const user = decodeToken(response.data.token);
        // dispatch(setUser(user));
        navigate('/');
      })
      .catch((err) => {
        console.log('Login Error:', err);
        dispatch(loginFailure(err.response.data.error));
      });
  };
}

export const registerSuccess = (user, token) => (dispatch) => {
  localStorage.setItem('token', token);

  dispatch({
    type: 'REGISTER_SUCCESS',
    payload: { user, token },
  });
};

export const registerFailure = (error) => ({
  type: 'REGISTER_FAILURE',
  payload: error,
});

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
        dispatch(registerFailure(err.response.data.error));
      });
  };
}
