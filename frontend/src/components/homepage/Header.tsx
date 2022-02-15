import React from 'react';

const Header = () => {
  return (
    <div className="fixed top-0 right-0 z-20 flex w-full text-center">
      <header className="w-full text-lime-400 body-font">
        <div className="flex flex-col flex-wrap items-center justify-between w-full p-5 mx-0 bg-transparent md:flex-row backdrop-blur-md">
          <a className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
            <img className="w-10 h-10" src="/img/icon.png" alt="로고 이미지" />
            <span className="ml-3 text-xl font-bold text-lime-400">
              푸르댕댕
            </span>
          </a>
          <nav className="flex flex-wrap items-center justify-center text-base cursor-pointer md:ml-4 md:py-1 md:pl-4 border-x-2 md:border-gray-400">
            <a className="mr-5 hover:text-lime-600">First Link</a>
            <a className="mr-5 hover:text-lime-600">Second Link</a>
            <a className="mr-5 hover:text-lime-600">로그인</a>
            <a className="mr-5 hover:text-lime-600">회원가입</a>
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
