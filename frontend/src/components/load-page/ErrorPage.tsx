import React from 'react';
import { useLottie } from 'lottie-react';
import error from './error.json';
import tw from 'tailwind-styled-components';

const ErrorPage = () => {
  const options = {
    animationData: error,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <ErrorDiv>
      {View}
      <H2>유효하지 않은 접근입니다.</H2>
    </ErrorDiv>
  );
};

export default ErrorPage;

const ErrorDiv = tw.div`
  flex-col min-h-screen wrap bg-green-50
`;

const H2 = tw.h2`
  text-red-500 animate-bounce
`;
