import React from 'react';
import { Route, Routes } from 'react-router-dom';

//페이지
import AccountPage from '../../pages/AccountPage';
import HomePage from '../../pages/HomePage';
import Login from '../account/Login';
import Register from '../account/Register';
import ErrorPage from '../load-page/ErrorPage';

//접근제한
import LoadingSpiner from '../load-page/LoadingSpiner';
import PrivateRoute from './PrivateRoute';

import { validLogin } from '../../api';
import { useRecoilValue } from 'recoil';
import PlantInfo from '../search/PlantInfo';

//lazy
const SearchPage = React.lazy(() => import('../../pages/SearchPage'));

const Routing = () => {
  const isLogin = useRecoilValue(validLogin);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/account/*"
        element={
          <PrivateRoute>
            <AccountPage />
          </PrivateRoute>
        }
      >
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route element={<SearchPage />} path="/search" />
      <Route element={<PlantInfo />} path="/search/:name" />
      <Route element={<ErrorPage />} path="*" />
    </Routes>
  );
};

export default Routing;
