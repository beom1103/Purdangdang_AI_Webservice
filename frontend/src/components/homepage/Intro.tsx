import React from 'react';

const Intro = () => {
  return (
    <div
      className="w-full h-screen bg-right bg-auto"
      style={{
        backgroundColor: '#f8f8f6',
        backgroundImage: 'url(/img/home1.jpg)',
        backgroundRepeat: 'no-repeat',
        minWidth: '1200px',
      }}
    >
      <div className="flex flex-col justify-start w-8/12">
        <span className="py-40 intro-span">
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipisicing elit. In itaque fugit quaerat odio
          repellendus sapiente cupiditate dicta dolore.
        </span>
        <span className="intro-span py-50">
          Lorem ipsum dolor, sit amet consectetur
        </span>
      </div>
    </div>
  );
};

export default Intro;
