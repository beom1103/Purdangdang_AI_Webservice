import React from 'react';
import { Route, Routes } from 'react-router-dom';

//페이지
import AccountPage from '../../pages/AccountPage';
import HomePage from '../../pages/HomePage';
import Login from '../account/Login';
import Register from '../account/Register';
import ErrorPage from '../load-page/ErrorPage';

//접근제한
import PrivateRoute from './PrivateRoute';

import { validLogin } from '../../api';
import { useRecoilValue } from 'recoil';
import PlantInfo from '../plant-detail/PlantInfo';
import Header from '../homepage/Header';
import PlantDetailPage from '../../pages/PlantDetailPage';
import PlantReview from '../plant-detail/PlantReview';
//lazy
const SearchPage = React.lazy(() => import('../../pages/SearchPage'));

const Routing = () => {
  const isLogin = useRecoilValue(validLogin);

  return (
    <div>
      <Header />
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
        <Route element={<PlantDetailPage />} path="/plant/:name">
          <Route index element={<PlantInfo />} />
          <Route path="review" element={<PlantReview />} />
        </Route>
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </div>
  );
};

export default Routing;
