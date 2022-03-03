import React from 'react';
import tw from 'tailwind-styled-components';
import { QuestionBox, IMG, Title } from '../../pages/SurveyPage';
import { CheckBox, CheckButton } from './AnswerButton';
type IntroProps = {
  setIsConFirm: React.Dispatch<React.SetStateAction<boolean>>;
};

const SurveyIntro: React.FC<IntroProps> = ({ setIsConFirm }) => {
  const image =
    'https://images.unsplash.com/photo-1509744645300-a2098b11871a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80';

  return (
    <QuestionBox>
      <div className="h-64 overflow-hidden rounded-lg">
        <IMG src={image} alt="survey-ex" />
      </div>
      <Title className="leading-10">푸르댕댕 추천 페이지</Title>
      <Example>
        여러분과 어울리는 푸르댕댕이를 추천하기 전 간단한 설문조사를 하는 페이지
        입니다. 여러분께 주어지는 두 가지 선택지 중 본인의 상황에 맞게 답을
        선택해주세요.
      </Example>
      <CheckBox className="wrap">
        <CheckButton onClick={(): void => setIsConFirm(true)}>
          검사 시작하기
        </CheckButton>
      </CheckBox>
    </QuestionBox>
  );
};

export default SurveyIntro;

const Example = tw.p` 
  mt-12
  text-lg
  text-left
`;
