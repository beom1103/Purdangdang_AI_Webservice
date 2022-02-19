import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/homepage/Header';
import VideoBackground from '../components/homepage/VideoBackground';
import Intro from '../components/homepage/Intro';
import UploadContainer from '../components/homepage/UploadContainer';
import PageMark from '../components/homepage/PageMark';

const DIVIDER_HEIGHT = 0;

const HomePage = () => {
  const outerDivRef: any = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState<number>(1);
  const [pageNum, setPageNum] = useState<number>(1);
  const pageHeight = window.innerHeight;
  const [textAnim, setTextAnim] = useState<boolean>(false);

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
        setScrollIndex(1);
        break;
      case 2: // 2번 페이지 (중간)
        outerDivRef.current.scrollTo({
          top: pageHeight + DIVIDER_HEIGHT,
          left: 0,
          behavior: 'smooth',
        });
        setScrollIndex(2);
        setTextAnim(true);
        break;
      case 3: // 3번 페이지 (하단)
        outerDivRef.current.scrollTo({
          top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
          left: 0,
          behavior: 'smooth',
        });
        setScrollIndex(3);
        break;
    }
  }, [pageNum]);

  useEffect(() => {
    const wheelHandler = (e: any) => {
      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;

      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setTextAnim(true);
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setTextAnim(true);
          setScrollIndex(3);
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(3);
        }
      } else {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(1);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(1);
        } else {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(2);
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener('wheel', wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener('wheel', wheelHandler);
    };
  }, []);

  return (
    <div ref={outerDivRef} className="main">
      <div className="navbar">
        <Header outerDivRef={outerDivRef} />
      </div>

      <div className="container hidden lg:block ">
        <PageMark
          scrollIndex={scrollIndex}
          setPageNum={setPageNum}
          pageHeight={pageHeight}
        />
      </div>

      <div className="relative ">
        <VideoBackground />
        <div className="flex">
          <div
            className="absolute center flex-col justify-center w-full h-screen"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <h2 className="text-2xl text-white 2xl:text-6xl">
              푸르른 나무처럼, 행복한 댕댕이 처럼
            </h2>
            <h4 className="mt-20 text-2xl text-white 2xl:text-4xl">
              대충 푸르댕댕 소개문구
            </h4>
          </div>
          <div className="bounce-arrow">
            <svg
              className="w-6 h-6 text-lime-500"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
      <div>
        <div className="relative">
          <Intro textAnim={textAnim} />
          <div className="bounce-arrow">
            <svg
              className="w-6 h-6 text-lime-500"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
      <div>
        <UploadContainer />
      </div>
    </div>
  );
};

export default HomePage;
