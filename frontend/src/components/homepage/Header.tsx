import React, { useState } from 'react';
import SideMenu from './SideMenu';

const Header = () => {
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
            <a className="header-link">First Link</a>
            <a className="header-link">Second Link</a>
            <a className="header-link">로그인</a>
            <a className="header-link">회원가입</a>
            {/* 
            <Link to="/" className="mr-5 hover:text-lime-600">
              First Link
            </Link>
            <Link to="/" className="mr-5 hover:text-lime-600">
              Second Link
            </Link>
            <Link to="/acount" className="mr-5 hover:text-lime-600">
              로그인
            </Link>
            <Link to="/acount/register" className="mr-5 hover:text-lime-600">
              회원가입
            </Link> */}
          </nav>
          <button className="header-btn" onClick={() => menuOpen()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
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

export default Header;
