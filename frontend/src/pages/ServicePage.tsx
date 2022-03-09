import { Link } from 'react-router-dom';
import Footer from '../components/global/Footer';

const ServicePage = () => {
  const img =
    'https://images.unsplash.com/photo-1533029026076-7160c0f3187b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

  return (
    <div>
      <img
        className="absolute top-0 left-0 block object-cover w-full h-4/5"
        src={img}
        alt="service-background-image"
      />
      <div className="relative z-20 flex items-center flex-grow px-5 sm:px-12 lg:px-24">
        <div className="w-full max-w-screen-xl mx-auto">
          <div className="relative pt-67 pb-38 md:pt-40 2xl:pt-46 2xl:ml-28.5">
            <div className="relative max-w-xl text-center sm:text-left md:w-4/6 xl:w-1/2 md:mr-20 ">
              <div className="mx-auto mb-8 text-4xl font-light leading-snug prose-titles max-w-3xs sm:max-w-none sm:mx-0 lg:text-5xl lg:mb-15">
                <h3 className="inline-block text-3xl text-green-400 mt-28 md:mt-0">
                  푸르댕댕은...
                </h3>
              </div>
              <div className="p-3 text-sm bg-gray-900 bg-opacity-50 mb-14 sm:text-lg sm:mb-18 lg:text-xl">
                <h3 className="text-lg font-bold text-white">
                  안녕히 계세요 여러분 전 이세상의 모든 속박과 굴레를 벗어던지고
                  자유를 찾아 떠납니다. 정말로 떠나고싶네요. 지금 새벽 3시가 다
                  되어가는데 게표방송 보면서 이게 뭐하는 짓거리인지... 아 여기
                  간단하게 뭐라도 채우면 좋겠는데 뭐라고 쓸지 모르겠어서 그냥
                  의식의 흐름대로 써놨습니다. 당장 의견 주세요. 안그러면 페이지
                  지워버림...
                </h3>
              </div>
              <Link to="/">
                <button className="justify-between p-3 mb-6 text-white bg-green-600 rounded-lg sm:mb-0 flex-grow- xs:w-auto hover:bg-green-700">
                  푸르댕댕 서비스 이용하러 가기
                </button>
              </Link>
            </div>
            <main className="text-gray-600 mt-52 sm:mt-72 body-font">
              <div className="container px-5 mx-auto">
                <h1 className="mb-10 text-2xl font-medium text-center text-gray-900 sm:text-3xl title-font">
                  서비스 소개
                </h1>
                <div className="flex flex-wrap -mx-4 -mt-4 -mb-10 space-y-6 sm:-m-4 md:space-y-0">
                  <div className="flex p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-green-500 bg-green-100 rounded-full">
                      <i className="fas fa-leaf" />
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
                        식물 이미지 식별
                      </h2>
                      <p className="text-base leading-relaxed">
                        지나가다가 혹은 카페에서 여러분의 눈에 들어왔지만,
                        이름을 모르겠는 식물이 있으신가요? 저희 푸르댕댕은 약
                        90여개의 식물 이미지를 학습한 모델을 토대로 알고싶은
                        식물을 찾아드립니다.
                      </p>
                      <Link to="/">
                        <button className="px-3 my-3 text-black bg-gray-200 rounded-lg sm:mb-0 xs:w-auto hover:bg-green-500">
                          GO~
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-green-500 bg-green-100 rounded-full">
                      <i className="fas fa-disease" />
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
                        식물 질병 진단
                      </h2>
                      <p className="text-base leading-relaxed">
                        여러분이 현재 키우고 있는 댕댕이의 사진을 찍어
                        올려주세요. 푸르댕댕의 AI가 학습한 모델이 질병의 유무를
                        진단하고, 관리방법까지 안내해드립니다.
                      </p>
                      <Link to="/">
                        <button className="px-3 my-3 text-black bg-gray-200 rounded-lg sm:mb-0 xs:w-auto hover:bg-green-500">
                          GO~
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="flex p-4 md:w-1/3">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mb-4 text-green-500 bg-green-100 rounded-full">
                      <i className="fas fa-search" />
                    </div>
                    <div className="flex-grow pl-6">
                      <h2 className="mb-2 text-lg font-medium text-gray-900 title-font">
                        식물 추천
                      </h2>
                      <p className="text-base leading-relaxed">
                        여러가지 설문(집안의 공간, 반려동물의 유무, 취향 등)을
                        토대로 여러분의 환경을 조사받아 적합한 식물을 추천해주는
                        기능입니다.
                      </p>
                      <Link to="/survey">
                        <button className="px-3 my-3 text-black bg-gray-200 rounded-lg sm:mb-0 xs:w-auto hover:bg-green-500">
                          GO~
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <footer className="my-20 text-gray-600 body-font">
              <div className="container px-5 mx-auto">
                <div className="w-full mx-auto text-center xl:w-1/2 lg:w-3/4">
                  <i className="text-3xl fas fa-quote-right" />
                  <h3 className="m-3 text-lg leading-relaxed">
                    서비스 이용시 주의사항
                  </h3>
                  <p className="text-lg leading-relaxed mb-7">
                    식물 이미지 검색 및 질병 진단 서비스를 이용시 다음을
                    유의해주세요.
                  </p>
                  <p className="text-lg leading-relaxed mb-7">
                    1. 최대한 식물을 가깝게 찍어주세요.
                  </p>
                  <p className="text-lg leading-relaxed mb-7">
                    2. 하나의 식물만 나오게 해주세요.
                  </p>
                  <p className="text-lg leading-relaxed mb-7">
                    3. 질병 진단 서비스 이용시 관엽식물(잎이 있는 식물)만
                    가능합니다!
                  </p>
                  <p className="text-lg leading-relaxed mb-7">
                    4. 아래 예시를 참고해주세요.
                  </p>
                  <div className="inline-flex wrap">
                    <img className="w-1/2 mx-3" src="img/valid.jpg" />
                    <img className="w-1/2 mx-3" src="img/invalid.jpg" />
                  </div>
                  <p className="mb-2 text-lg leading-relaxed">
                    올바른 예(왼쪽), 올바르지 않은 예(오른쪽)
                  </p>
                </div>
              </div>
            </footer>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
