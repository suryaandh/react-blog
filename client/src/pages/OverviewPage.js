import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';


const OverviewPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('User is not logged in or token is missing/expired.');
    }
  }, []);

  return (
    // <div>
    //   {user ? (
    //     <div>
    //       <h2>{user.name}</h2>
    //       <p>Email: {user.email}</p>
    //       <p>Date of Birth: {user.dateOfBirth}</p>
    //       <p>Address: {user.address}</p>
    //       <p>Description: {user.description}</p>
    //       <Link to="/update-profile">Update Profile</Link>
    //     </div>
    //   ) : (
    //     <p>User is not logged in or token is missing/expired.</p>
    //   )}
    // </div>
    <>
      <div className='about-box'>
        {user ? (
          <div>
            {/* <h2>{user.email}</h2> */}
            <div className='image'>
              <img src={user.image} alt={user.name} />
            </div>
            <h1>{user.name}</h1>
            <p>{user.description}</p>
          </div>

        ) : (
          <p>User is not logged in or token is missing/expired.</p>
        )}
      </div>
    </>
  );
};

export default OverviewPage;
