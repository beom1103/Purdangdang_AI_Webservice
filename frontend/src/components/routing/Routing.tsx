import React from "react";
import { Route, Routes } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { validLogin } from "../../api";

//페이지
import AccountPage from "../../pages/AccountPage";
import HomePage from "../../pages/HomePage";
import Login from "../account/Login";
import Register from "../account/Register";
import ErrorPage from "../load-page/ErrorPage";
import MyPage from "../../pages/MyPage";

//접근제한
import PrivateRoute from "./PrivateRoute";

import PlantInfo from "../plant-detail/PlantInfo";
import Header from "../homepage/Header";

import PlantReview from "../plant-detail/PlantReview";

//lazy
const SearchPage = React.lazy(() => import("../../pages/SearchPage"));
const SurveyPage = React.lazy(() => import("../../pages/SurveyPage"));
const PlantDetailPage = React.lazy(() => import("../../pages/PlantDetailPage"));

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
        <Route element={<ErrorPage />} path="*" />
        <Route element={<MyPage />} path="/mypage" />
      </Routes>
    </div>
  );
};

export default Routing;
