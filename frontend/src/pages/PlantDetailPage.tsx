import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/global/Footer';

import tw from 'tailwind-styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { infoAtom, getDetailInfo } from '../api/search';
import { addMyPage, isLikePlant } from '../api/myPage';
import { validLogin } from '../api';

const PlantDetailPage = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(validLogin);
  const params = useParams() as { name: string };
  const [info, setInfo] = useRecoilState(infoAtom);
  const [fill, setFill] = useState(false);

  const likePlant = useCallback((): void => {
    fillHeart();
    addMyPage(fill, params.name);
  }, [fill]);

  const id = React.useMemo(() => {
    if (params.name !== undefined) {
      return Number(params.name);
    }
    return null;
  }, [params]);

  const fillHeart = useCallback((): void => {
    if (!user) {
      alert('로그인 후 이용할 수 있습니다.');
    } else {
      setFill(!fill);
    }
  }, [fill]);

  useEffect(() => {
    const handlePopState = () => {
      navigate('/search');
    };

    const fetchInfo = async () => {
      const newInfo = await getDetailInfo(`/plant/${id}/info`);
      const like = await isLikePlant(params.name);
      setFill(like);
      setInfo(newInfo);
    };

    fetchInfo();

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  if (id === null) {
    return null;
  }

  return (
    <Main>
      <Container>
        <Wrap>
          <img alt="plant" className="plant-info-img" src={info?.image_url} />
          <Div>
            <h4 className="text-sm">이름</h4>
            <h2 className="mb-4 text-green-600 ">
              {info?.kor}
              <button className="like" onClick={() => fillHeart}>
                <Heart
                  className={fill ? 'text-red-500 text-xl' : 'text-gray-500'}
                  onClick={likePlant}
                />
              </button>
            </h2>
            <div className="flex mb-4">
              <NavLink
                to="info"
                className={({ isActive }) =>
                  isActive ? 'active-link' : 'plant-link'
                }
              >
                Info
              </NavLink>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  isActive ? 'active-link' : 'plant-link'
                }
              >
                Reviews
              </NavLink>
            </div>
            <Outlet />
          </Div>
        </Wrap>
      </Container>
      <Footer />
    </Main>
  );
};

export default React.memo(PlantDetailPage);

const Main = tw.main`
  content-center 
  px-3 
  overflow-hidden 
  mt-10
  lg:mt-32

`;

const Container = tw.div`
  container 
  py-10 
  mx-auto
`;

const Wrap = tw.div`
  flex 
  flex-wrap 
  mx-auto 
  lg:w-4/5
`;

const Div = tw.div`
  w-full 
  my-auto 
  lg:w-1/2
`;

const Heart = tw.i`
  fas
  fa-heart
  bg-none
  border-none
`;
