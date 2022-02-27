import React, { useState, useRef, useCallback, useEffect } from 'react';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../store/user';
import { validLogin } from '../../api';
import { logout } from '../../api';

const Header = () => {
  const [menus, setMenus] = useState(false);
  const [headerColor, setHeaderColor] = useState(false);
  const headerRef = useRef<HTMLHeadElement | null>(null);

  const isLogin = useRecoilValue(userAtom);

  const menuOpen = React.useCallback(() => {
    setMenus(true);
  }, []);

  // const navbar = document.querySelector('.navbar');
  // const navbarHeight = navbar?.getBoundingClientRect().height;

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

  // useEffect(() => {
  //   console.log(pageNum);

  //   switch (pageNum) {
  //     case 1:
  //       setHeaderColor(false);
  //       break;
  //     case 2:
  //       setHeaderColor(true);
  //       break;
  //     case 3:
  //       setHeaderColor(true);
  //       break;
  //     default:
  //       null;
  //       break;
  //   }
  // }, [pageNum]);

  // const handleHeaderScroll = useCallback(() => {
  //   const headerHeight = headerRef.current?.clientHeight ?? 0;
  //   if (window.scrollY > headerHeight) {
  //     return setHeaderColor(true);
  //   }

  //   setHeaderColor(false);
  // }, []);

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
          <Link to="/" className=" wrap md:mb-0">
            <img className="logo" src="/img/icon.png" alt="로고 이미지" />
            <span className="logo-span">푸르댕댕</span>
          </Link>
          <nav className="hidden nav lg:block">
            <div className="flex ">
              <div>
                <Link to="/" className="header-link">
                  홈
                </Link>
                <Link to="/search" className="header-link">
                  검색
                </Link>
              </div>
              {isLogin ? (
                <div>
                  <button className="header-link" onClick={() => logout()}>
                    로그아웃
                  </button>
                  <Link to="/" className="header-link">
                    마이페이지
                  </Link>
                </div>
              ) : (
                <div>
                  <Link to="/account" className="header-link">
                    로그인
                  </Link>
                  <Link to="/account/register" className="header-link">
                    회원가입
                  </Link>
                </div>
              )}
            </div>
          </nav>
          <button className="header-btn" onClick={() => menuOpen()}>
            <i className="text-green-500 fas fa-bars"></i>
          </button>
        </Div>
      </header>
      <div className="absolute right-0 z-50">
        <SideMenu menu={menus} selectMenu={setMenus} />
      </div>
    </div>
  );
};

export default Header;

const Div = tw.div`
  header-bg
  transition
  duration-300
  ease-in-out
`;
