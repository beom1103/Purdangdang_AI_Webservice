import React from 'react';

const Marker = ({ num, scrollIndex, setPageNum, title }: any) => {
  return (
    <div
      className={`w-24 h-8 cursor-pointer`}
      style={{
        color: scrollIndex === num ? '#64dd17' : '#bdbdbd',
        transition: 'color 0.5s',
      }}
      onClick={() => {
        setPageNum(num);
      }}
    >
      <span className="text-lg">{title}</span>
    </div>
  );
};

const PageMark = ({ scrollIndex, setPageNum, pageHeight }: any) => {
  return (
    <div className="fixed z-30 text-center top-2/4 left-16">
      <div className="flex flex-col items-center justify-between w-12 h-36">
        <Marker
          num={1}
          scrollIndex={scrollIndex}
          setPageNum={setPageNum}
          title={'-메인-'}
        />
        <Marker
          num={2}
          scrollIndex={scrollIndex}
          setPageNum={setPageNum}
          title={'-소개글-'}
        />
        <Marker
          num={3}
          scrollIndex={scrollIndex}
          setPageNum={setPageNum}
          title={'-식물찾기-'}
        />
      </div>
    </div>
  );
};

export default PageMark;
