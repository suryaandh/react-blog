import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, setToken } from '../actions/authActions';

const Header = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  const logout = () => {
    dispatch(removeToken());
    window.location.href = '/login';
  };

  const [showPostsDropdown, setShowPostsDropdown] = useState(false);

  const togglePostsDropdown = () => {
    setShowPostsDropdown(!showPostsDropdown);
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
            <div className="dropdown" onMouseEnter={togglePostsDropdown} onMouseLeave={togglePostsDropdown}>
              <span>Posts</span>
              {showPostsDropdown && (
                <div className="dropdown-content">
                  <Link to="/post">All Posts</Link>
                  <Link to="/overview">Overview</Link>
                </div>
              )}
            </div>
            <Link className='logout' onClick={logout}>Logout</Link>
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
