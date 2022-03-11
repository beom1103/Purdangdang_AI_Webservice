import React, { useState, useRef, useEffect } from 'react';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { validLogin } from '../../api';
import { logout } from '../../api';
import { plantQueryAtom } from '../../api/search';

const Header = () => {
  const [menus, setMenus] = useState(false);
  const [headerColor, setHeaderColor] = useState(false);
  const headerRef = useRef<HTMLHeadElement | null>(null);
  const resetPlantQuery = useResetRecoilState(plantQueryAtom);

  const isLogin = useRecoilValue(validLogin);

  const menuOpen = React.useCallback(() => {
    setMenus(true);
  }, []);

  const handleHeaderScroll = React.useCallback(() => {
    const headerHeight = headerRef.current?.clientHeight ?? 0;
    if (window.scrollY > headerHeight) {
      return setHeaderColor(true);
    }

    setHeaderColor(false);
  }, []);

  React.useEffect(() => {
    window.addEventListener('scroll', handleHeaderScroll);

    return () => {
      window.removeEventListener('scroll', handleHeaderScroll);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleHeaderScroll);

    return () => {
      window.removeEventListener('scroll', handleHeaderScroll);
    };
  }, []);

  return (
    <div className={`header-div`}>
      <header ref={headerRef} className="w-full">
        <Div
          className={` ${
            headerColor ? `bg-white drop-shadow-md` : `backdrop-blur-md`
          }`}
        >
          <Link to="/" className="w-40 wrap md:mb-0" onClick={resetPlantQuery}>
            <img className="logo" src="/img/icon.png" alt="로고 이미지" />
            <span className="logo-span">푸르댕댕</span>
          </Link>
          <nav className="hidden nav lg:block">
            <div className="flex">
              <div>
                <Link to="/" className="header-link" onClick={resetPlantQuery}>
                  홈
                </Link>
                <Link to="/search" className="header-link">
                  검색
                </Link>
                <Link to="/service" className="header-link">
                  서비스 소개
                </Link>
              </div>
              {isLogin ? (
                <div>
                  <Link
                    to="/mypage"
                    className="header-link"
                    onClick={resetPlantQuery}
                  >
                    마이페이지
                  </Link>
                  <button className="header-link" onClick={() => logout()}>
                    로그아웃
                  </button>
                </div>
              ) : (
                <div>
                  <Link
                    to="/account"
                    className="header-link"
                    onClick={resetPlantQuery}
                  >
                    로그인
                  </Link>
                  <Link
                    to="/account/register"
                    className="header-link"
                    onClick={resetPlantQuery}
                  >
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </nav>
          <div className="flex justify-end w-40">
            <button className=" header-btn" onClick={() => menuOpen()}>
              <i className="text-green-500 fas fa-bars"></i>
            </button>
          </div>
        </Div>
      </header>
      <div className="absolute right-0 z-50 ">
        <SideMenu menu={menus} selectMenu={setMenus} />
      </div>
    </div>
  );
};

export default Header;

const Div = tw.div`
  header-bg
  transition
  duration-100
  ease-in-out
`;
