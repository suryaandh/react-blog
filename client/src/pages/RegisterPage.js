import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '', name: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      await dispatch(registerUser(credentials));
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='register'>
        <h1>Register</h1>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          name='name'
          placeholder="Name"
          value={credentials.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name='email'
          placeholder="Email"
          value={credentials.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name='password'
          placeholder="Password"
          value={credentials.password}
          onChange={handleInputChange}
        />
        <button onClick={handleRegister}>Register</button>
      </div>
    </>
  );
};

export default RegisterPage;
