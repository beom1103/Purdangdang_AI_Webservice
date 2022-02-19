import React from 'react';

const DetailModal = () => {
  return (
    <div className="flex flex-col items-center w-full h-full ">
      <div className="w-full h-10 flex justify-start text-gray-600 my-3 font-semibold pl-6">
        상세 정보
      </div>

      <div className="w-full my-3 h-full lg:flex">
        <div className="w-full my-3 h-2/5 lg:h-3/5 lg:w-2/4">
          <img
            src="https://i.pinimg.com/originals/1c/cc/23/1ccc23d257858830d213aea46bef2c0c.jpg"
            alt=""
            className="w-full h-full"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="lg:flex lg:flex-col lg:w-2/4">
          <h2 className="text-gray-800 font-lg font-bold tracking-normal leading-tight text-center">
            식물 이름
          </h2>
          <div className="w-11/12 my-4 border-b-2 border-gray-200"></div>
          <div className="">
            <p className="px-8 tracking-tighter">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Veritatis corporis, dolores, temporibus nihil porro, labore at hic
              reiciendis soluta non quis unde beatae nesciunt. Tenetur
              temporibus fugit illum aspernatur numquam atque repudiandae,
              maxime magnam voluptatum error quidem deleniti quo autem
              perferendis et. Dolores maxime, laborum iusto obcaecati totam
              expedita deserunt.
            </p>
            <div className="w-11/12 my-4 border-b-2 border-gray-200"></div>
          </div>
        </div>
      </div>

      <div className="px-8 w-full">
        <li className="list-none py-1 flex flex-row justify-between">
          <div>
            <img
              src="/img/water.png"
              alt="water"
              className="w-5 h-5 inline-block mr-8"
            />
            <span>물</span>
          </div>
          <span className="items-center">1주일에 2번씩 주면 배불러요</span>
        </li>
        <li className="list-none py-1 flex flex-row justify-between">
          <div>
            <img
              src="/img/sun.png"
              alt="water"
              className="w-5 h-5 inline-block mr-8"
            />
            <span>햇빛</span>
          </div>
          <span className="items-center">햇빛을 좋아하는 친구</span>
        </li>
        <li className="list-none py-1 flex flex-row justify-between">
          <div>
            <img
              src="/img/rain.png"
              alt="water"
              className="w-5 h-5 inline-block mr-8"
            />
            <span>습도</span>
          </div>
          <span className="items-center">보통 정도의 습도를 좋아해요</span>
        </li>
        <li className="list-none py-1 flex flex-row justify-between">
          <div>
            <img
              src="/img/ondo.png"
              alt="water"
              className="w-5 h-5 inline-block mr-8"
            />
            <span>온도</span>
          </div>
          <span className="items-center">더운거 싫어요</span>
        </li>
      </div>
      <div className="w-11/12 my-4 border-b-2 border-gray-200"></div>

      <div className="w-full">
        <div className="flex flex-row justify-between mx-8">
          <p className="">커뮤니티</p>
          <button className="">
            <p className="text-black">+더보기</p>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <button className="focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150 text-gray-600 ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-sm">
          닫기
        </button>
      </div>
      <button
        className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
        aria-label="close modal"
        role="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-x"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default DetailModal;
