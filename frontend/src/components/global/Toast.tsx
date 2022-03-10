import React from 'react';
import tw from 'tailwind-styled-components';

const Toast = ({ msg }: any) => {
  return <Div>{msg}</Div>;
};

export default Toast;

const Div = tw.div`
  fixed
  z-30
  h-10
  p-2
  text-center
  text-white
  transform
  rounded-md
  w-52
  bg-black/70
  bottom-20
  min-w-fit
`;