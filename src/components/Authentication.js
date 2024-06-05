import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../redux/authSlice';

const Authentication = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <div className="mb-4">
      {isAuthenticated ? (
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(logout())}
        >
          Logout
        </button>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => dispatch(login())}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Authentication;
