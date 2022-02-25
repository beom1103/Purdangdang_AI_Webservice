import React from 'react';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/global/Footer';

import fake from '../store/fake.json';
import tw from 'tailwind-styled-components';
// import { useSetRecoilState } from 'recoil';
// import { plantAtom } from '../api/shop';

const PlantDetailPage = () => {
  const params = useParams() as { name: string };
  const navigate = useNavigate();
  const id = React.useMemo(() => {
    if (params.name !== undefined) {
      return Number(params.name);
    }
    return null;
  }, [params]);

  //
  if (id === null) {
    return null;
  }

  window.onpopstate = () => {
    navigate('/search');
  };

  return (
    <Main>
      <Container>
        <Wrap>
          <img alt="plant" className="plant-info-img" src={fake[id].image} />
          <Div>
            <h4 className="text-sm">이름</h4>
            <h2 className="mb-4 text-green-600 ">
              {fake[id].kor}
              <button className="like">
                <i className="fas fa-heart like" />
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

export default PlantDetailPage;

const Main = tw.main`
  content-center 
  px-3 
  overflow-hidden 
  mt-24
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
