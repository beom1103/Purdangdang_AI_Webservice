import React from 'react';
import { useLottie } from 'lottie-react';
import loading from './loading.json';
import tw from 'tailwind-styled-components';

const UploadLoading = () => {
  const options = {
    animationData: loading,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return (
    <LoadingDiv>
      {View}
      <H3>식물 정보를 모으는 중 이에요.</H3>
    </LoadingDiv>
  );
};

export default UploadLoading;

const LoadingDiv = tw.div`
  absolute
  flex-col
  min-h-screen
  wrap
  bg-black/70
  inset-0
  z-50
`;

const H3 = tw.div`
  mt-20
  text-2xl 
  font-extrabold 
  text-green-500 
  animate-bounce
`;
