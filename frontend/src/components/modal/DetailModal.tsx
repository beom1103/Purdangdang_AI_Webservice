import React from 'react';
import tw from 'tailwind-styled-components';

const DetailModal = ({ isModal, plantData }: any) => {
  const plantName = plantData && plantData.top1.detail.kor;
  const plantImage = plantData && plantData.top1.detail.image_url;
  const plantScript = plantData && plantData.top1.detail.description;
  const plantWater = plantData && plantData.top1.detail.water_cycle;
  const plantSun = plantData && plantData.top1.detail.sunlight;
  const plantTempe = plantData && plantData.top1.detail.temperature;

  const plantPer = plantData && plantData.top1.percent;

  const closeModal = () => {
    isModal(false);
  };

  return (
    <Div>
      <Container>
        <div className="detail_Modal-title">상세 정보</div>
        <button className="detail_Modal-exit" onClick={() => closeModal()}>
          X
        </button>
      </Container>

      <div className="w-full lg:h-full lg:flex">
        <ImgBox>
          <img
            src={plantImage}
            alt=""
            className="w-full h-full lg:rounded-md"
            style={{ objectFit: 'cover' }}
          />
        </ImgBox>
        <div className="detail_Modal-box">
          <div className="w-full ">
            <p className="detail_Modal-name">{plantName}</p>
          </div>
          <div className="detail_Modal-line"></div>
          <div className="w-full">
            <p className="px-8 my-4 lg:p-0 ">{plantScript}</p>
          </div>
          <div className="detail_Modal-line"></div>
        </div>
      </div>

      <div className="w-full mt-6 h-3/6">
        <div className="w-full px-8 lg:py-0">
          <li className="detail_Modal-li">
            <div className="flex items-center">
              <I className="text-blue-500 fas fa-water"></I>
              <span className="text-sm">물</span>
            </div>
            <span className="items-center text-sm">{plantWater}</span>
          </li>
          <li className="detail_Modal-li">
            <div className="flex items-center">
              <I className="text-orange-500 fas fa-sun"></I>
              <span className="text-sm">햇빛</span>
            </div>
            <span className="items-center text-sm">{plantSun}</span>
          </li>
          <li className="detail_Modal-li">
            <div className="flex items-center">
              <I className="text-green-500 fas fa-temperature-low"></I>
              <span className="text-sm">온도</span>
            </div>
            <span className="items-center text-sm">{plantTempe}</span>
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
    </Div>
  );
};

export default DetailModal;

const Div = tw.div`
  flex
  flex-col
  items-center
  w-full
  h-full
`;

const Container = tw.div`
  flex
  justify-between
  w-full
  mb-0
  bg-green-50
  lg:mb-7
  border-b-2
  border-gary-500
`;

const ImgBox = tw.div`
  w-full
  lg:pl-6
  lg:h-full
  lg:w-2/4
`;

const I = tw.i`
  detail_Modal-i
`;
