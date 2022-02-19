import React from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
// 쿼리스트링? 동적라우팅 작업 해야함.
import fake from '../store/fake.json';

const PlantDetailPage = () => {
  const params = useParams();
  const id = Number(params.name);

  return (
    <section className="px-3 pt-16 overflow-hidden">
      <div className="container py-10 mx-auto">
        <div className="flex flex-wrap mx-auto lg:w-4/5">
          <img alt="plant" className="plant-info-img" src={fake[id].image} />
          <div className="w-full my-auto lg:w-1/2">
            <h4 className="text-sm">이름</h4>
            <h2 className="mb-4 text-green-600 ">
              {fake[id].kor}
              <button className="like">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </h2>
            <div className="flex mb-4">
              <Link to="" className="plant-link">
                Info
              </Link>
              <Link to="reviews" className="plant-link">
                Reviews
              </Link>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantDetailPage;
