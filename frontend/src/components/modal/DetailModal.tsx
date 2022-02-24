import React from 'react';

const DetailModal = ({ showModal }: any) => {
  const closeModal = () => {
    showModal(false);
  };

  return (
    <div className="flex flex-col items-center w-full h-full ">
      <div className="flex justify-between w-full">
        <div className="detail_Modal-title">상세 정보</div>
        <button
          className="detail_Modal-exit"
          aria-label="close modal"
          role="button"
          onClick={() => closeModal()}
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

      <div className="w-full lg:h-full lg:flex">
        <div className="w-full lg:pl-6 lg:h-full lg:w-2/4">
          <img
            src="https://i.pinimg.com/originals/1c/cc/23/1ccc23d257858830d213aea46bef2c0c.jpg"
            alt=""
            className="w-full h-full lg:rounded-md"
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="detail_Modal-box">
          <div className="w-full ">
            <p className="detail_Modal-name">식물댕</p>
          </div>
          <div className="detail_Modal-line"></div>
          <div className="w-full">
            <p className="px-8 my-4 lg:p-0 ">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Veritatis corporis, dolores, temporibus nihil porro, labore at hic
              reiciendis soluta non quis unde beatae nesciunt. Tenetur
              temporibus fugit illum aspernatur numquam atque repudiandae,
              maxime magnam voluptatum error quidem deleniti quo autem
              perferendis et. Dolores maxime, laborum iusto obcaecati totam
              expedita deserunt.
            </p>
          </div>
          <div className="detail_Modal-line"></div>
        </div>
      </div>

      <div className="w-full mt-6 h-3/6">
        <div className="w-full px-8 lg:py-0">
          <li className="detail_Modal-li">
            <div className="flex items-center">
              <i className="text-blue-500 detail_Modal-i fas fa-water"></i>
              <span className="text-sm">물</span>
            </div>
            <span className="items-center text-sm">
              1주일에 2번씩 주면 배불러요
            </span>
          </li>
          <li className="detail_Modal-li">
            <div className="flex items-center">
              <i className="text-orange-500 detail_Modal-i fas fa-sun"></i>
              <span className="text-sm">햇빛</span>
            </div>
            <span className="items-center text-sm">햇빛을 좋아하는 친구</span>
          </li>
          <li className="detail_Modal-li">
            <div className="flex items-center">
              <i className="text-green-500 detail_Modal-i fas fa-temperature-low"></i>
              <span className="text-sm">온도</span>
            </div>
            <span className="items-center text-sm">더운거 싫어요</span>
          </li>
          <div className="detail_Modal-line"></div>
        </div>

        <div className="w-full mt-4">
          <div className="flex flex-row justify-between mx-8">
            <p className="">커뮤니티</p>
            <button className="">
              <p className="text-black">+더보기</p>
            </button>
          </div>
        </div>

        <div className="detail_Modal-btnBox">
          <button onClick={() => closeModal()} className="detail_Modal-btn">
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
