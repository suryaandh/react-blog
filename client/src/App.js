import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './actions/authActions';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === 'token') {
        dispatch(setToken(value));
      }
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
