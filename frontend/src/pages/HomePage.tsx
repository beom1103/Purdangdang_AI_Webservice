/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import VideoBackground from '../components/homepage/VideoBackground';
import Intro from '../components/homepage/Intro';
import UploadContainer from '../components/homepage/UploadContainer';
import PageMark from '../components/homepage/PageMark';
import tw from 'tailwind-styled-components';
import Toast from '../components/global/Toast';

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
  const contentsRef: any = useRef<HTMLDivElement[]>([]);
  const [scrollIndex, setScrollIndex] = useState<number>(1);
  const [textAnim, setTextAnim] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [ToastStatus, setToastStatus] = useState(false);
  const [ToastMsg, setToastMsg] = useState('');
  let initialScroll = window.scrollY;

  const TIME_OUT = 600;
  let startFlag = true;
  let num = 0;
  let main = null;
  let next = null;

  const handleToast = (): void => {
    setToastStatus(true);
    setToastMsg(
      '질병 진단 서비스 이용시 관엽식물(잎이 있는 식물)만 가능합니다!',
    );
  };

  useEffect(() => {
    if (ToastStatus) {
      setTimeout(() => {
        setToastStatus(false);
        setToastMsg('');
      }, 3500);
    }
  }, [ToastStatus]);

  useEffect(() => {
    window.scroll(0, 30);
    const scrollHandler = () => {
      if (num === 0) {
        num = 1;
      } else {
        if (startFlag) {
          const scrollDown = window.scrollY >= initialScroll;
          const scrollLimit = num >= 1 && num <= 3;
          if (scrollLimit) {
            document.body.style.overflowY = 'hidden';
            if (scrollDown && num < 3) {
              main = contentsRef.current[num];
              next = contentsRef.current[num + 1];
              main.style.transform = 'translateY(-100vh)';
              next.style.transform = 'translateY(0)';
              num++;
            } else if (!scrollDown && num > 1) {
              main = contentsRef.current[num - 1];
              next = contentsRef.current[num];
              main.style.transform = 'translateY(0vh)';
              next.style.transform = 'translateY(100vh)';
              num--;
            }
          }
          setTimeout(() => {
            initialScroll = window.scrollY;
            startFlag = true;
            document.body.style.overflowY = 'scroll';
          }, TIME_OUT);
          startFlag = false;
        }
        window.scroll(0, 30);
      }
      if (num === 2) {
        setTextAnim(true);
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
    <Body className="main home-page">
      <div className="container hidden lg:block">
        <PageMark scrollIndex={scrollIndex} />
      </div>

      <div className="relative w-full ">
        <ContentBox
          className="box1 z-3"
          ref={elem => (contentsRef.current[1] = elem)}
        >
          <div className="relative">
            <VideoBackground />
            <div className="flex">
              <TextBox className="h-screen main_background">
                <h2 className="text-2xl text-white 2xl:text-6xl">
                  사람에겐 휴식의 공간을,
                </h2>
                <h2 className="text-2xl text-white 2xl:text-6xl">
                  식물에겐 자기만의 공간을.
                </h2>
                <H4>
                  서로의 공간이 합쳐져 새로운 공간을 창조하는 일에 도움이 되길
                </H4>
              </TextBox>

              <div className="bounce-arrow">
                <i className="text-2xl text-lime-500 fas fa-arrow-down" />
              </div>
            </div>
          </div>
        </ContentBox>
        <ContentBox
          className="box2 z-2"
          style={{ transform: `translateY(100vh)` }}
          ref={elem => (contentsRef.current[2] = elem)}
        >
          <div className="relative ">
            <Intro textAnim={textAnim} />
            <div className="bounce-arrow">
              <i className="text-2xl text-lime-500 fas fa-arrow-down" />
            </div>
          </div>
        </ContentBox>
        <ContentBox
          className="box3 z-1"
          style={{ transform: `translateY(100vh)` }}
          ref={elem => (contentsRef.current[3] = elem)}
        >
          <UploadContainer setIsModal={setIsModal} handleToast={handleToast} />
          <div className="w-full">
            <div className="fixed flex justify-center w-full">
              <Toast
                msg={
                  '질병 진단 서비스 이용시 관엽식물(잎이 있는 식물)만 가능합니다!'
                }
                ToastStatus={ToastStatus}
              />
            </div>
          </div>
        </ContentBox>
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

const TextBox = tw.div`
  absolute
  flex-col
  w-full
  h-screen
  wrap
  top-2/4
  left-2/4
  -translate-x-2/4
  -translate-y-2/4
`;

const H4 = tw.h4`
  hidden
  mt-20
  text-2xl
  text-white
  lg:block
  2xl:text-4xl
`;

const ContentBox = tw.div`
  fixed
  w-full
  h-screen
  transition
  duration-700
  ease-in-out
`;
