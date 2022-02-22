import React, { useState } from 'react';
import SideMenu from './SideMenu';
import { Link } from 'react-router-dom';

const Header = ({ outerDivRef }: any) => {
  const [menus, setMenus] = useState(false);

  const menuOpen = () => {
    setMenus(true);
  };

  return (
    <div className="header-div">
      <header className="w-full">
        <div className="header-bg">
          <a className="mb-4 wrap md:mb-0">
            <img className="logo" src="/img/icon.png" alt="로고 이미지" />
            <span className="logo-span">푸르댕댕</span>
          </a>
          <nav className="nav">
            <Link to="/" className="header-link">
              First Link
            </Link>
            <Link to="/" className="header-link">
              Second Link
            </Link>
            <Link to="/account" className="header-link">
              로그인
            </Link>
            <Link to="/account/register" className="header-link">
              회원가입
            </Link>
          </nav>
          <button className="header-btn" onClick={() => menuOpen()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>
      <div className="absolute right-0 z-50">
        <SideMenu menu={menus} selectMenu={setMenus} />
      </div>
    </div>
  );
};

export default React.memo(Header);
