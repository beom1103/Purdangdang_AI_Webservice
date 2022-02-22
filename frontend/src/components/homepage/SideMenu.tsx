import React, { useEffect, useState } from 'react';

const SideMenu = ({ menu, selectMenu }: any) => {
  const menuClose = () => {
    selectMenu(false);
  };

  return (
    <div className="">
      {/* <div
        className={`w-screen h-screen m-0`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      > */}
      <div
        className={`menuBar bg-white text-black w-96 h-screen absolute right-0 space-y-6 rounded-l-lg drop-shadow-md transform  transition duration-200 ease-in-out ${
          menu ? `translate-x-0` : `translate-x-full`
        }`}
      >
        <button className="w-5 h-5 text-black" onClick={() => menuClose()}>
          X
        </button>

        <div className="text-3xl font-extrabold">메뉴</div>
        <nav className="flex flex-col border-0 p-0">
          <a
            href="#"
            className="block py-2.5 px-4 hover:bg-green-300 transition duration-200 ease-in-out w-full p-0"
          >
            푸르댕댕 검색
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 hover:bg-green-300 transition duration-200 ease-in-out w-full p-0"
          >
            나와 어울리는 푸르댕댕은?
          </a>
          <a
            href="#"
            className="block py-2.5 px-4 hover:bg-green-300 transition duration-200 ease-in-out w-full p-0"
          >
            마이 페이지
          </a>
        </nav>
        {/* <div
          className={`w-screen h-screen m-0`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        ></div> */}
      </div>
    </div>
  );
};

export default SideMenu;
