import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, setToken } from '../actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, []);

  const logout = () => {
    dispatch(removeToken());
    navigate('/login');
  };

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {token ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/post">Post</Link>
            <Link className='logout' onClick={logout}>Logout</Link>
          </>
        ) : (
          <>
            {/* <Link to="/">About</Link>
            <Link to="/">Contact</Link> */}
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
