import React from 'react';
import tw from 'tailwind-styled-components';

type ToastProps = {
  msg: string;
  ToastStatus: boolean;
};

const Toast: React.FC<ToastProps> = ({ msg, ToastStatus }) => {
  return (
    <Div className={`${ToastStatus ? `opacity-100` : `opacity-0`}`}>{msg}</Div>
  );
};

export default Toast;

const Div = tw.div`
  fixed
  z-30
  p-2
  text-center
  text-white
  transform
  rounded-xl
  w-52
  bg-black/50
  bottom-16
  min-w-fit
  transition 
  ease-in-out
  duration-200
  m-10
`;
