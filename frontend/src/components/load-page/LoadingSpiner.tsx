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
      className="object-cover min-h-screen pb-2 wrap"
    >
      {View}
      <h3 className="mt-5 text-2xl font-extrabold text-green-500 animate-bounce">
        로딩중입니다.
      </h3>
    </div>
  );
};

export default LoadingSpiner;
