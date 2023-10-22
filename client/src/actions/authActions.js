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

export const removeToken = () => (dispatch) => {
  localStorage.removeItem('token');

  dispatch({
    type: 'REMOVE_TOKEN',
  });
};

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

export const loginUser = (credentials, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', credentials);

      if (response.status === 200) {
        dispatch(loginSuccess(response.data.user, response.data.token));
        localStorage.setItem('token', response.data.token);
        navigate('/');
      } else {
        console.log('Error logging in');
      }
    } catch (error) {
      console.log('Login Error:', error);
      dispatch(loginFailure(error.response.data.error));
    }
  };
};

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
