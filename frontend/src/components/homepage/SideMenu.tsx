import React, { useCallback } from 'react';

const SideMenu = ({ menu, selectMenu }: any) => {
  const menuClose = useCallback((): void => {
    selectMenu(false);
  }, [menu]);

  return (
    <div className="">
      <div
        className={`side-div ${menu ? `translate-x-0` : `translate-x-full`}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="side-title">
          <span className="inline-block pr-2">
            <svg className="w-8 h-8 fill-current " viewBox="0 0 24 24">
              <path
                d="M16 20h4v-4h-4m0-2h4v-4h-4m-6-2h4V4h-4m6
                        4h4V4h-4m-6 10h4v-4h-4m-6 4h4v-4H4m0 10h4v-4H4m6
                        4h4v-4h-4M4 8h4V4H4v4z"
              ></path>
            </svg>
          </span>
          메뉴
        </div>
        <nav className="flex flex-col p-0 py-10 border-0 ">
          <a href="#" className="side-link">
            <div className="flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-10 h-10 pr-4 "
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span>푸르댕댕 검색</span>
            </div>
          </a>
          <div className="flex w-full">
            <div className="w-11/12 border-b-2 border-gray-200"></div>
          </div>
          <a href="#" className="side-link">
            <div className="flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-10 h-10 pr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span>나와 어울리는 푸르댕댕은?</span>
            </div>
          </a>
          <div className="flex w-full">
            <div className="w-11/12 border-b-2 border-gray-200"></div>
          </div>
          <a href="#" className="side-link">
            <div className="flex-row">
              <svg className="inline-block w-10 h-10 pr-4" viewBox="0 0 24 24">
                <path
                  d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0
                        014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4
                        8-4z"
                ></path>
              </svg>
              <span>마이 페이지</span>
            </div>
          </a>
          <div className="flex w-full">
            <div className="w-11/12 border-b-2 border-gray-200"></div>
          </div>
        </nav>

        <div className="py-16">
          <button className="side-exit" onClick={() => menuClose()}>
            <span className="inline-block pr-4 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 stroke-black "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </span>
            닫기
          </button>
          <div className="flex w-full">
            <div className="w-11/12 border-b-2 border-gray-200"></div>
          </div>
        </div>
      </div>
      <div
        className={`w-screen h-screen m-0 ${
          menu ? 'block' : 'hidden'
        } menuBackground`}
        onClick={() => menuClose()}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      ></div>
    </div>
  );
};

export default SideMenu;
