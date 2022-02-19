import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const PlantDetailPage = () => {
  return (
    <section className="px-3 pt-16 overflow-hidden">
      <div className="container py-10 mx-auto">
        <div className="flex flex-wrap mx-auto lg:w-4/5">
          <img
            alt="plant"
            className="plant-info-img"
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20210615_232%2F1623739853385wUEKy_JPEG%2F24875681211371768_1566788254.jpg&type=sc960_832"
          />
          <div className="w-full my-auto lg:w-1/2">
            <h4 className="text-sm">이름</h4>
            <h2 className="mb-4 text-green-600 ">
              보스턴 고사리
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
              <Link to="review" className="plant-link">
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
