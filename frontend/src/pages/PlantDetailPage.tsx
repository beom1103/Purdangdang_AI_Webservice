import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import Footer from '../components/global/Footer';
// 쿼리스트링? 동적라우팅 작업 해야함.
import fake from '../store/fake.json';
import tw from 'tailwind-styled-components';

const PlantDetailPage = () => {
  const params = useParams();
  const id = Number(params.name);

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
  lg:pt-32
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
