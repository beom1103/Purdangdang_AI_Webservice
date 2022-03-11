import React from 'react';
import { Route, Routes } from 'react-router-dom';

//페이지
//lazy
const HomePage = React.lazy(() => import('../../pages/HomePage'));
const Login = React.lazy(() => import('../account/Login'));
const Register = React.lazy(() => import('../account/Register'));
const MyPage = React.lazy(() => import('../../pages/MyPage'));
const SearchPage = React.lazy(() => import('../../pages/SearchPage'));
const SurveyPage = React.lazy(() => import('../../pages/SurveyPage'));
const PlantDetailPage = React.lazy(() => import('../../pages/PlantDetailPage'));
import AccountPage from '../../pages/AccountPage';
import ErrorPage from '../load-page/ErrorPage';
import ServicePage from '../../pages/ServicePage';

//접근제한
import PrivateRoute from './PrivateRoute';
import PlantInfo from '../plant-detail/PlantInfo';
import Header from '../global/Header';
import PlantReview from '../plant-detail/PlantReview';

const Routing = () => {
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
        <Route element={<SurveyPage />} path="/survey" />
        <Route element={<MyPage />} path="/mypage" />
        <Route element={<ServicePage />} path="/service" />
        <Route element={<ErrorPage />} path="*" />
      </Routes>
    </div>
  );
};

export default Routing;
