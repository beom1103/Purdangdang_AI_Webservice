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
    <div className="flex-col min-h-screen wrap bg-green-50">
      {View}
      <h2 className="text-red-500 animate-bounce">유효하지 않은 접근입니다.</h2>
    </div>
  );
};

export default ErrorPage;
