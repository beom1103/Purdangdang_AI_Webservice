import React from 'react';

const Header = () => {
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
          <button className="inline-flex items-center px-3 py-1 mt-4 text-base border-0 rounded focus:outline-none md:mt-0">
            <img
              src="./img/bars-solid.png"
              className="w-4 h-4 fill-white"
              alt="메뉴 버튼"
            />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
