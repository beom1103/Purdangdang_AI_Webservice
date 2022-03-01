import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/homepage/Header';
import VideoBackground from '../components/homepage/VideoBackground';
import Intro from '../components/homepage/Intro';
import UploadContainer from '../components/homepage/UploadContainer';
import PageMark from '../components/homepage/PageMark';
import tw from 'tailwind-styled-components';

const DIVIDER_HEIGHT = 0;

const throttle = (callback: any, waitTime: number) => {
  let timerId: any = null;
  return (e: any) => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback.call(this, e);
      timerId = null;
    }, waitTime);
  };
};

const HomePage = () => {
  const outerDivRef: any = useRef<HTMLDivElement>(null);
  const contentsRef: any = useRef([]);
  const [scrollIndex, setScrollIndex] = useState<number>(1);
  const [pageNum, setPageNum] = useState<number>(1);
  const pageHeight = window.innerHeight;
  const [textAnim, setTextAnim] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  let initialScroll = window.scrollY;

  const TIME_OUT = 600;
  let startFlag = true;
  let num = 0;
  let main = null;
  let next = null;

  // pageMark(책갈피가 안 되는 현상)
  useEffect(() => {
    switch (
      pageNum //총 3개의 파트로 나눠진 페이지의 번호를 매개변수로 사용
    ) {
      case 1: // 1번 페이지(최상단)
        outerDivRef.current.scrollTo({
          //화면의 속성 중 scrollTo 함수를 사용해서 (화면에 표시되는)위치 변경
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        setPageNum(1);
        break;
      case 2: // 2번 페이지 (중간)
        outerDivRef.current.scrollTo({
          top: pageHeight + DIVIDER_HEIGHT,
          left: 0,
          behavior: 'smooth',
        });
        setPageNum(2);
        setTextAnim(true);
        break;
      case 3: // 3번 페이지 (하단)
        outerDivRef.current.scrollTo({
          top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
          left: 0,
          behavior: 'smooth',
        });
        setPageNum(3);
        break;
    }
  }, [pageNum]);

  useEffect(() => {
    window.scroll(0, 30);
    const scrollHandler = () => {
      console.log('실행');
      if (num === 0) {
        num = 1;
      } else {
        if (startFlag) {
          const scrollDown = scrollY >= initialScroll;

          const scrollLimit = num >= 1 && num <= 3;
          if (scrollLimit) {
            // document.body.style.overflowY = 'hidden';
            if (scrollDown && num < 3) {
              main = contentsRef.current[num];
              next = contentsRef.current[num + 1];
              main ? (main.style.transform = 'translateY(-100vh)') : null;
              next ? (next.style.transform = 'translateY(0)') : null;
              num++;
            } else if (!scrollDown && num > 1) {
              main = contentsRef.current[num - 1];
              next = contentsRef.current[num];
              main ? (main.style.transform = 'translateY(0vh)') : null;
              next ? (next.style.transform = 'translateY(100vh)') : null;
              num--;
            }
          }
          setTimeout(() => {
            initialScroll = scrollY;
            startFlag = true;
            // document.body.style.overflowY = 'scroll';
          }, TIME_OUT);
          startFlag = false;
        }
        window.scroll(0, 30);
      }
      setScrollIndex(num);
    };
    const throttleScroll = throttle(scrollHandler, 25);

    window.addEventListener('scroll', throttleScroll);
    return () => {
      window.removeEventListener('scroll', throttleScroll);
    };
  }, []);

  return (
    <Body
      ref={outerDivRef}
      className="main"
      style={{
        // overflow: `scroll`,
        height: `calc(100vh * 3)`,
      }}
    >
      <div className="container hidden lg:block">
        <PageMark scrollIndex={scrollIndex} setPageNum={setPageNum} />
      </div>

      <div className="relative w-full ">
        <div
          className="fixed w-full h-screen transition duration-700 ease-in-out box1"
          style={{ zIndex: 3 }}
          ref={elem => (contentsRef.current[1] = elem)}
        >
          <div className="relative ">
            <VideoBackground />
            <div className="flex">
              <div
                className="absolute flex-col w-full h-screen wrap"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                }}
              >
                <h2 className="text-2xl text-white 2xl:text-6xl">
                  사람에겐 휴식의 공간을,
                </h2>
                <h2 className="text-2xl text-white 2xl:text-6xl">
                  식물에겐 자기만의 공간을.
                </h2>
                <h4 className="hidden mt-20 text-2xl text-white lg:block 2xl:text-4xl">
                  서로의 공간이 합쳐져 새로운 공간을 창조하는 일에 도움이 되길
                </h4>
              </div>

              <div className="bounce-arrow">
                <svg
                  className="w-6 h-6 text-lime-500"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          className="fixed w-full h-screen transition duration-700 ease-in-out box2"
          style={{ zIndex: 2, transform: `translateY(100vh)` }}
          ref={elem => (contentsRef.current[2] = elem)}
        >
          <div className="relative ">
            <Intro textAnim={textAnim} />
            <div className="bounce-arrow">
              <svg
                className="w-6 h-6 text-lime-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
        <div
          className="fixed w-full h-screen transition duration-700 ease-in-out box3"
          style={{ zIndex: 1, transform: `translateY(100vh)` }}
          ref={elem => (contentsRef.current[3] = elem)}
        >
          <UploadContainer setIsModal={setIsModal} />
        </div>
      </div>
    </Body>
  );
};

export default HomePage;

const Body = tw.div`
  overflow: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar': {
    display: 'none',
  };
`;
