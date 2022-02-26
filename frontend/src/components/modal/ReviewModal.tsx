import React from 'react';
import tw from 'tailwind-styled-components';

const ReviewModal = () => {
  return (
    <Modal>
      <h3>별점</h3>
      <div className="wrap">
        <Star />
        <Star />
        <Star />
        <Star />
        <Star />
      </div>
      <h3 className="mt-8">리뷰</h3>
      <TextArea></TextArea>
      <Button>제출</Button>
    </Modal>
  );
};

export default ReviewModal;

const Modal = tw.div`
  bg-white
  backdrop-blur-md
  w-11/12
  md:w-3/5
  h-3/5
  relative
  p-10
  border
  rounded-md
  border-2
  `;

const TextArea = tw.textarea` 
  mt-8  
  w-full
  border-2
  border-gray-500
  p-3
  h-1/2
`;

const Button = tw.button`
  mt-8
  buy-button
  `;

const Star = tw.i`
  ml-3
  text-2xl 
  text-gray-300 
  fas 
  fa-star
`;
