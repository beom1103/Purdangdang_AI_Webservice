import React, { useEffect, useState } from 'react';
import DetailModal from '../modal/DetailModal';
import tw from 'tailwind-styled-components';

const UploadModal = ({ isModal }: any) => {
  const [detail, setDetail] = useState(false);

  const closeModal = () => {
    isModal(false);
  };

  return (
    <div className="modal-div sticky-0 modal" onClick={() => closeModal()}>
      <div className="modal-container">
        <div
          className={`modal-background ${
            detail
              ? `lg:scale-x-150 lg:scale-y-125 overflow-auto scroll-style`
              : null
          }`}
          onClick={e => e.stopPropagation()}
        >
          {detail ? (
            <DetailModal isModal={isModal}></DetailModal>
          ) : (
            <div className="modal-box">
              <div className="flex justify-end w-full mb-8"></div>
              <p className="modal-title">이 댕댕이는?</p>
              <p className="modal-text">식물댕댕이일 확률이 높습니다.</p>

              <div className="modal-img">
                <img
                  src="https://i.pinimg.com/originals/1c/cc/23/1ccc23d257858830d213aea46bef2c0c.jpg"
                  alt=""
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="modal-next">이 댕댕이가 더 궁금하다면?</div>
              <div>
                <button
                  className="upload-btn"
                  onClick={() => setDetail(!detail)}
                >
                  상세 정보
                </button>
                <Close onClick={() => closeModal()}>닫기</Close>
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
