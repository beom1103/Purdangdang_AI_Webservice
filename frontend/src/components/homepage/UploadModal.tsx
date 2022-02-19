import React, { useEffect, useState } from 'react';

const UploadModal = ({ showModal }: any) => {
  const [detail, setDetail] = useState(false);

  const closeModal = () => {
    showModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  return (
    <div
      className="fixed top-0 w-screen h-screen overflow-hidden bg-gray-900 bg-opacity-70 sticky-0 modal"
      onClick={() => closeModal()}
    >
      <div className="flex items-end justify-center w-screen h-screen animate-fade-in-up-two lg:items-center">
        <div
          className={`relative flex flex-col items-center justify-center w-full px-4 py-16 bg-white rounded-t-lg h-5/6 lg:rounded-lg lg:w-4/12 lg:h-4/6 ${
            detail ? `lg:w-8/12 lg:h-5/6 ` : null
          }`}
          onClick={e => e.stopPropagation()}
        >
          {detail ? (
            <p>asdasd</p>
          ) : (
            <div>
              <p className="static top-0 text-base font-semibold sm:text-lg lg:text-lg">
                이 댕댕이는 식물댕댕이일 확률이 높습니다.
              </p>
              <button
                className="absolute text-gray-800 closeBtn dark:text-gray-400 top-8 right-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 "
                onClick={() => closeModal()}
                aria-label="close"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="1.66667"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="w-full my-3 overflow-hidden border-0 rounded-md h-3/5 drop-shadow-2xl md:w-60">
                <img
                  src="https://i.pinimg.com/originals/1c/cc/23/1ccc23d257858830d213aea46bef2c0c.jpg"
                  alt=""
                  className="w-full h-full"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="mb-4 text-sm font-semibold border-b-2 border-slate-300 md:text-xl">
                이 댕댕이가 더 궁금하다면?
              </div>
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
