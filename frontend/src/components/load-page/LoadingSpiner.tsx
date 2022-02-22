import React from 'react';
import { useLottie } from 'lottie-react';
import loading from './loading.json';
import tw from 'tailwind-styled-components';

const LoadingSpiner = () => {
  const options = {
    animationData: loading,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <LoadingDiv style={{ backgroundColor: '#f7f0dc' }}>
      {View}
      <H3>로딩중입니다.</H3>
    </LoadingDiv>
  );
};

export default LoadingSpiner;

const LoadingDiv = tw.div`
  flex-col min-h-screen wrap
`;

const H3 = tw.div`
  mt-5 
  text-2xl 
  font-extrabold 
  text-green-500 
  animate-bounce
`;
