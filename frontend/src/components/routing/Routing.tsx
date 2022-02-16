import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// lazy
//페이지
import AccountPage from '../../pages/AccountPage';
import HomePage from '../../pages/HomePage';
import Login from '../account/Login';
import Register from '../account/Register';
import ErrorPage from '../load-page/ErrorPage';
import SearchPage from '../../pages/SearchPage';

//접근제한
import LoginPrivateRoute from './LoginPrivateRoute';

const Routing = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/account/*"
            element={
              <LoginPrivateRoute>
                <AccountPage />
              </LoginPrivateRoute>
            }
          >
            <Route path="" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
          <Route element={<SearchPage />} path="/search" />
          <Route element={<ErrorPage />} path="*" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;
