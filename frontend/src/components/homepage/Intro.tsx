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
      <div className="flex flex-col justify-start w-8/12 h-screen">
        <span className="px-20 py-40 text-gray-600 2xl:text-6xl lg:text-3xl">
          Lorem ipsum dolor sit amet,
          <br /> consectetur adipisicing elit. In itaque fugit quaerat odio
          repellendus sapiente cupiditate dicta dolore.
        </span>
        <span className="px-20 text-gray-600 py-50 2xl:text-5xl lg:text-2xl">
          Lorem ipsum dolor, sit amet consectetur
        </span>
      </div>
    </div>
  );
};

export default Intro;
