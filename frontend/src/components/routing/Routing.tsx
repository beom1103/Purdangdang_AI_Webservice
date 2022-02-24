import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { validLogin } from '../../api';

//페이지
import AccountPage from '../../pages/AccountPage';
import HomePage from '../../pages/HomePage';
import Login from '../account/Login';
import Register from '../account/Register';
import ErrorPage from '../load-page/ErrorPage';

//접근제한
import PrivateRoute from './PrivateRoute';

import PlantInfo from '../plant-detail/PlantInfo';
import Header from '../homepage/Header';
import PlantDetailPage from '../../pages/PlantDetailPage';
import PlantReview from '../plant-detail/PlantReview';
import Footer from '../global/Footer';

import { userAtom } from '../../store/user';
//lazy
const SearchPage = React.lazy(() => import('../../pages/SearchPage'));

const Routing = () => {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await validLogin();
      setUser(user);
    };
    fetchUserData();
  }, []);

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
          <Route path="info" element={<PlantInfo />} />
          <Route path="reviews" element={<PlantReview />} />
        </Route>
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </div>
  );
};

export default Routing;
