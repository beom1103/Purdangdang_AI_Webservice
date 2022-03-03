import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useRecoilValue } from 'recoil';
import { validLogin } from '../../api';
import { logout } from '../../api';

const SideMenu = ({ menu, selectMenu }: any) => {
  const menuClose = useCallback((): void => {
    selectMenu(false);
  }, [menu]);

  const isLogin = useRecoilValue(validLogin);

  return (
    <div className="">
      <div
        className={`side-div ${menu ? `translate-x-0` : `translate-x-full`}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="side-title">
          <span className="inline-block pr-2">
            <i className="w-8 h-8 leading-10 fas fa-border-all"></i>
          </span>
          메뉴
        </div>
        <nav className="flex flex-col p-0 py-10 border-0 ">
          <Link to="/" className="side-link" onClick={() => menuClose()}>
            <div className="flex flex-row items-center">
              <I className="fas fa-home"></I>
              <span>홈</span>
            </div>
          </Link>
          <div className="flex w-full">
            <Line></Line>
          </div>

          {isLogin ? (
            <div className="w-full">
              <a href="#" className="side-link">
                <div className="flex-row">
                  <I className="fas fa-user"></I>
                  <span>마이 페이지</span>
                </div>
              </a>
              <div className="flex w-full">
                <Line></Line>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <Link
                to="/account"
                className="side-link"
                onClick={() => menuClose()}
              >
                <div className="flex flex-row items-center">
                  <I className="fas fa-lock"></I>
                  <span>로그인</span>
                </div>
              </Link>
              <div className="flex w-full">
                <Line></Line>
              </div>
            </div>
          )}
          <Link to="/search" className="side-link" onClick={() => menuClose()}>
            <div className="flex flex-row items-center">
              <I className="fas fa-search"></I>
              <span>푸르댕댕 검색</span>
            </div>
          </Link>
          <div className="flex w-full">
            <Line></Line>
          </div>
          <Link to="/survey" className="side-link">
            <div className="flex-row">
              <I className="fas fa-filter"></I>
              <span>나와 어울리는 푸르댕댕은?</span>
            </div>
          </Link>
          <div className="flex w-full">
            <Line></Line>
          </div>
        </nav>

        <div className="py-16">
          {isLogin ? (
            <button className="side-exit" onClick={() => logout()}>
              <span className="inline-block pr-4 ">
                <i className="w-8 h-8 leading-8 fas fa-lock-open"></i>
              </span>
              로그아웃
            </button>
          ) : null}
          <button className="side-exit" onClick={() => menuClose()}>
            <span className="inline-block pr-4 ">
              <i className="w-8 h-8 leading-8 fas fa-door-open"></i>
            </span>
            닫기
          </button>
          <div className="flex w-full">
            <Line></Line>
          </div>
        </div>
      </div>
      <div
        className={`w-screen h-screen m-0 ${menu ? 'block' : 'hidden'} `}
        onClick={() => menuClose()}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      ></div>
    </div>
  );
};

export default SideMenu;

const I = tw.i`
  inline-block
  w-10
  h-10
  pr-4
  leading-10
`;

const Line = tw.div`
  w-11/12
  border-b-2
  border-gray-200
`;
