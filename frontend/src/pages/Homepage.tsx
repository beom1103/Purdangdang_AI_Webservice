import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/homepage/Header';
import VideoBackground from '../components/homepage/VideoBackground';
import Intro from '../components/homepage/Intro';
import UploadContainer from '../components/homepage/UploadContainer';

const DIVIDER_HEIGHT = 5;

const HomePage = () => {
  const outerDivRef: any = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState<number>(1);

  useEffect(() => {
    const wheelHandler = (e: any) => {
      console.log(window.innerHeight);

      e.preventDefault();
      const { deltaY } = e;
      const { scrollTop } = outerDivRef.current;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        if (scrollTop >= 0 && scrollTop < pageHeight) {
          outerDivRef.current.scrollTo({
            top: pageHeight + DIVIDER_HEIGHT,
            left: 0,
            behavior: 'smooth',
          });
          setScrollIndex(2);
        } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
          outerDivRef.current.scrollTo({
            top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
            left: 0,
            behavior: 'smooth',
          });
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
      <Header />
      <div className="relative">
        <VideoBackground />
        <div>
          <h2 className="absolute text-white 2xl:text-6xl top-72 right-12">
            푸르른 나무처럼, 행복한 댕댕이 처럼
          </h2>
          <h4 className="absolute text-white top-96 right-12">
            대충 푸르댕댕 소개문구
          </h4>
        </div>
      </div>
      <div>
        <Intro />
      </div>
      <div>
        <UploadContainer />
      </div>
    </div>
  );
};

export default HomePage;
