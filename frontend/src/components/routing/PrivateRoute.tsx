import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../store/user';
//로그인 후 페이지 제한
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isLogin = useRecoilValue(userAtom);

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
