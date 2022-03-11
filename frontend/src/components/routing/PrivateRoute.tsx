import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { validLogin } from '../../api';

//로그인 후 페이지 제한
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isLogin = useRecoilValue(validLogin);

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
