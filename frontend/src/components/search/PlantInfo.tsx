import React from 'react';
//ui 작업중...
const PlantInfo = () => {
  return (
    <section className="overflow-hidden">
      <div className="container px-3 py-10 mx-auto">
        <div className="flex flex-wrap mx-auto lg:w-4/5">
          <img
            alt="plant"
            className="plant-info-img"
            src="https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20210615_232%2F1623739853385wUEKy_JPEG%2F24875681211371768_1566788254.jpg&type=sc960_832"
          />
          <div className="w-full my-auto lg:w-1/2">
            <h4 className="text-sm">이름</h4>
            <h2 className="mb-4 text-green-600">보스턴 고사리</h2>

            <div className="flex mb-4">
              <a className="plant-link">Info</a>
              <a className="plant-link">Reviews</a>
              <a className="plant-link">Details</a>
            </div>
            <p className="mb-4 leading-relaxed">
              풍성하고 아름다운 잎 때문에 빅토리아 시대부터 실내에 도입되어
              사랑을 받아왔으며, 오늘날에도 여전히 인기가 높은 실내식물이다.
            </p>
            <div className="plant-info-div">
              <i className="text-blue-500 fas fa-water"> 물</i>
              <span className="ml-auto text-gray-900">주 2~3회</span>
            </div>
            <div className="plant-info-div">
              <i className="text-orange-500 fas fa-sun"> 햇빛</i>
              <span className="ml-auto text-gray-900">반음지</span>
            </div>
            <div className="mb-6 border-b plant-info-div">
              <i className="text-green-500 fas fa-temperature-low"> 온도</i>
              <span className="ml-auto text-gray-900">
                잘 자라는 온도 : 16~20℃, 겨울철 관리 온도 : 13℃ 이상
              </span>
            </div>
            <div className="flex">
              <span className="font-medium text-gray-900 title-font"></span>
              <button className="buy-button">구매하러 가기</button>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlantInfo;
