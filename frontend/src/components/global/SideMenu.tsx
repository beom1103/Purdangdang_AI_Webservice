import { SetStateAction, useCallback } from 'react';
import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { validLogin } from '../../api';
import { logout } from '../../api';
import { plantQueryAtom } from '../../api/search';

type MenuProps = {
  menu: boolean;
  selectMenu: React.Dispatch<SetStateAction<boolean>>;
};

const SideMenu = ({ menu, selectMenu }: MenuProps) => {
  const resetPlantQuery = useResetRecoilState(plantQueryAtom);
  const menuClose = useCallback((): void => {
    selectMenu(false);
    resetPlantQuery();
  }, [menu]);

  const isLogin = useRecoilValue(validLogin);

  return (
    <div className="">
      <div
        className={`side-div ${menu ? `translate-x-0` : `translate-x-full`}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="side-title">메뉴</div>
        <nav className="flex flex-col p-0 py-10 border-0 ">
          <Link to="/" className="side-link" onClick={() => menuClose()}>
            <div className="flex-row center">
              <I className="fas fa-home" />
              <span>홈</span>
            </div>
          </Link>
          <div className="flex w-full">
            <Line></Line>
          </div>

          {isLogin ? (
            <div className="w-full">
              <Link
                to="/mypage"
                className="side-link"
                onClick={() => menuClose()}
              >
                <div className="flex-row">
                  <I className="fas fa-user" />
                  <span>마이 페이지</span>
                </div>
              </Link>
              <div className="flex w-full">
                <Line />
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
                  <I className="fas fa-lock" />
                  <span>로그인</span>
                </div>
              </Link>
              <div className="flex w-full">
                <Line />
              </div>
            </div>
          )}
          <Link to="/search" className="side-link" onClick={() => menuClose()}>
            <div className="flex-row center">
              <I className="fas fa-search" />
              <span>푸르댕댕 검색</span>
            </div>
          </Link>
          <div className="flex w-full">
            <Line />
          </div>
          <Link to="/survey" className="side-link" onClick={() => menuClose()}>
            <div className="flex-row">
              <I className="fas fa-leaf" />
              <span>나와 어울리는 푸르댕댕은?</span>
            </div>
          </Link>
          <div className="flex w-full">
            <Line />
          </div>
          <Link to="/service" className="side-link" onClick={() => menuClose()}>
            <div className="flex-row">
              <I className="fas fa-file" />
              <span>서비스 소개</span>
            </div>
          </Link>
          <div className="flex w-full">
            <Line />
          </div>
        </nav>

        <div className="py-16">
          {isLogin ? (
            <SideExit onClick={() => logout()}>
              <Span>
                <I className="fas fa-lock-open" />
                로그아웃
              </Span>
            </SideExit>
          ) : null}
          <SideExit onClick={() => menuClose()}>
            <Span>
              <I className="fas fa-door-open" />
              닫기
            </Span>
          </SideExit>
          <div className="flex w-full">
            <Line />
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

const SideExit = tw.button` 
  side-exit
`;

const Span = tw.span`
  inline-block 
  pr-4
`;
