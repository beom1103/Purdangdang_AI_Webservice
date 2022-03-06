import React, { useEffect, useState } from 'react';
import DetailModal from '../modal/DetailModal';
import tw from 'tailwind-styled-components';

const UploadModal = ({ isModal, plantData }: any) => {
  const [detail, setDetail] = useState(false);

  console.log(plantData);

  const plantName = plantData ? plantData.top1.detail.kor : null;
  const plantImage = plantData && plantData.top1.detail.image_url;
  const plantPer = plantData ? plantData.top1.percent : null;

  const closeModal = () => {
    isModal(false);
  };

  return (
    <div className="modal-div sticky-0 modal" onClick={() => closeModal()}>
      <div className="mt-10 modal-container ">
        <div
          className={`modal-background  ${
            detail
              ? `lg:scale-x-150 lg:scale-y-125 overflow-auto scroll-style`
              : null
          }`}
          onClick={e => e.stopPropagation()}
        >
          {detail ? (
            <DetailModal isModal={isModal} plantData={plantData}></DetailModal>
          ) : (
            <div className="">
              <div className="modal-box ">
                <div className="flex justify-end w-full mb-8"></div>
                <p className="modal-title">이 댕댕이는?</p>
                <p className="modal-text">
                  {plantName}일 확률 {plantPer}.
                </p>

                <div className="modal-img">
                  <img
                    src={plantImage}
                    alt=""
                    className="w-full h-full"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="modal-next">이 댕댕이가 더 궁금하다면?</div>
                <div>
                  <button
                    className="upload-btn main-color"
                    onClick={() => setDetail(!detail)}
                  >
                    상세 정보
                  </button>
                  <Close onClick={() => closeModal()}>닫기</Close>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

const Close = tw.button`
  bg-transparent
  items-center
  w-32
  m-2
  border-2
  wrap
  hover:bg-gray-100
  h-9
  text-gray-600
`;
