import React from 'react';
import { Navigate } from 'react-router-dom';

//로그인 후 페이지 제한
const LoginPrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isLogin = false;

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default LoginPrivateRoute;
