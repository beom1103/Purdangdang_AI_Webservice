import React, { useEffect, useState } from 'react';
import DetailModal from '../modal/DetailModal';

const UploadModal = ({ showModal }: any) => {
  const [detail, setDetail] = useState(false);

  const closeModal = () => {
    showModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

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
            <DetailModal showModal={showModal}></DetailModal>
          ) : (
            <div className="modal-box">
              <div className="flex justify-end w-full mb-8">
                <button
                  className="modal-btn"
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
                  className=" upload-btn"
                  onClick={() => setDetail(!detail)}
                >
                  상세 정보
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
