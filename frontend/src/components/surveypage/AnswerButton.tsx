import React from 'react';
import tw from 'tailwind-styled-components';
import { Question } from '../../store/type';

type answerProps = {
  question: Question;
  next: (e: any) => void;
};

const AnswerButton: React.FC<answerProps> = ({ question, next }) => {
  return (
    <CheckBox>
      <div className="wrap">
        <CheckButton name={`${question.id}`} value={0} onClick={next}>
          {question.answer1}
        </CheckButton>
      </div>

      <div className="wrap">
        <CheckButton name={`${question.id}`} value={1} onClick={next}>
          {question.answer2}
        </CheckButton>
      </div>
    </CheckBox>
  );
};

export default AnswerButton;

export const CheckButton = tw.button`
  p-5
  w-52
  bg-gray-500
  mb-12
  hover:bg-green-600
`;

export const CheckBox = tw.div`
  grid
  mt-12
  md:px-20
`;
