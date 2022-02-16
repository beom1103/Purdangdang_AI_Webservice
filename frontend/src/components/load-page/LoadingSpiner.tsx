import React from 'react';
import { useLottie } from 'lottie-react';
import loading from './loading.json';

const LoadingSpiner = () => {
  const options = {
    animationData: loading,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div
      style={{ backgroundColor: '#f7f0dc' }}
      className="flex flex-col items-center justify-center object-cover min-h-screen pb-2"
    >
      {View}
      <h3 className="mt-5 text-2xl font-extrabold text-green-500 animate-bounce">
        로딩중입니다.
      </h3>
    </div>
  );
};

export default LoadingSpiner;
