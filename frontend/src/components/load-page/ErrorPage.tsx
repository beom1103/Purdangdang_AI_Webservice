import React from 'react';
import { useLottie } from 'lottie-react';
import error from './error.json';

const ErrorPage = () => {
  const options = {
    animationData: error,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
      {View}
      <h3 className="mt-5 text-2xl font-extrabold text-red-500 animate-bounce">
        유효하지 않은 접근입니다.
      </h3>
    </div>
  );
};

export default ErrorPage;
