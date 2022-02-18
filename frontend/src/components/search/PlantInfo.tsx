import React from 'react';
//ui 작업중...
const PlantInfo = () => {
  return (
    <div className="relative xl:pt-16 sm:m-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="mx-auto md:w-6/12 lg:w-4/12">
            <div className="relative flex flex-col w-full min-w-0 mb-6 break-words bg-green-400 rounded-lg shadow-lg">
              <img
                alt="plant"
                src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA3MjdfNzUg%2FMDAxNjI3MzQ4MDkzMzkz.h8PqDyCUKfWx2uSumWDTLdqUe6gG-CO3KrRjvR4O2tkg.uMRlTCutxfTYo6dCzQfHHAo0EZr1SXptcMZ9_EiQRycg.JPEG.inbelairnow%2F1627347917215.jpg&type=sc960_832"
                className="w-full align-middle rounded-t-lg"
              />
              <blockquote className="relative p-8 mb-4">
                <h4 className="text-xl font-bold text-white">
                  몬스테리테라라라
                </h4>
                <p className="mt-2 font-light text-white text-md">
                  식물 어쩌구 저쩌구 물 잘 주셈, 많이주셈 안그러면 말라 죽음
                </p>
              </blockquote>
            </div>
          </div>

          <div className="w-full px-4 md:w-6/12">
            <div className="flex flex-wrap">
              <div className="w-full px-4 md:w-6/12">
                <div className="relative flex flex-col mt-4">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center bg-white rounded-full shadow-lg text-blueGray-500">
                      <i className="fas fa-sitemap"></i>
                    </div>
                    <h3 className="mb-1 font-semibold">물주기</h3>
                    <p className="mb-4">많이줘</p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center bg-white rounded-full shadow-lg">
                      <i className="fas fa-drafting-compass"></i>
                    </div>
                    <h3 className="mb-1 font-semibold">햇빛</h3>
                    <p className="mb-4">안보면 죽어</p>
                  </div>
                </div>
              </div>
              <div className="w-full px-4 md:w-6/12">
                <div className="relative flex flex-col min-w-0 mt-4">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center bg-white rounded-full shadow-lg">
                      <i className="fas fa-newspaper"></i>
                    </div>
                    <h3 className="mb-1 font-semibold">여기는</h3>
                    <p className="mb-4">여러분</p>
                  </div>
                </div>
                <div className="relative flex flex-col min-w-0">
                  <div className="flex-auto px-4 py-5">
                    <div className="inline-flex items-center justify-center w-12 h-12 p-3 mb-5 text-center bg-white rounded-full shadow-lg">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <h3 className="mb-1 font-semibold">뭐를 넣을까요</h3>
                    <p className="mb-4">알려주세요</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="relative pt-8 pb-6 mt-2">
        <div className="container px-4 mx-auto">
          <div className="wrap md:justify-between">
            <div className="w-full px-4 mx-auto text-center md:w-6/12">
              <div className="py-1 text-sm font-semibold">@ 푸르댕댕</div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PlantInfo;
