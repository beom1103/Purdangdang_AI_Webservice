import React from 'react';

const Header = () => {
  return (
    <div className="header-div">
      <header className="w-full">
        <div className="header-bg">
          <a className="mb-4 center md:mb-0">
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
          <button className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border-0 rounded focus:outline-none hover:bg-gray-200 md:mt-0">
            {/* Button */}
            {/* <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg> */}
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
