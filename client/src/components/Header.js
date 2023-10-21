import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

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
            <Link to="/create">New post</Link>
            <a className='logout' onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
