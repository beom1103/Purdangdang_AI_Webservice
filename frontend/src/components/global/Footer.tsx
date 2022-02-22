import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../store/user';
import { logout } from '../../api';

const Footer = () => {
  const isLogin = useRecoilValue(userAtom);
  const onClick = () => {
    logout();
  };

  return (
    <div className="bg-green-200">
      <footer className="p-3 m-auto wrap">
        <div className="footer-div">
          <div className="flex mx-auto text-center">
            <Link to="/" className="p-2">
              홈으로
            </Link>
            {isLogin ? (
              <span className="p-2 cursor-pointer" onClick={onClick}>
                로그아웃
              </span>
            ) : (
              <>
                <Link to="/account" className="p-2">
                  로그인
                </Link>
                <Link to="/account/register" className="p-2">
                  회원가입
                </Link>
              </>
            )}
          </div>
          <div className="flex mx-auto text-center">
            copyright © 푸르댕댕 (2022)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default React.memo(Footer);
