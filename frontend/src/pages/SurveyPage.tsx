import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { validLogin } from '../api';
import questionList from '../store/questionList.json';
import tw from 'tailwind-styled-components';
import AnswerButton from '../components/surveypage/AnswerButton';
import Complete from '../components/surveypage/Complete';

const SurveyPage = () => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(validLogin);
  const [questionNo, setQuestionNo] = useState<number>(0);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const question = questionList[questionNo];

  const next = useCallback(
    e => {
      if (questionNo < 8) {
        const { value } = e.target;
        const newList = checkList;
        newList.push(value);
        setCheckList(newList);
        setQuestionNo(questionNo + 1);
        console.log(checkList);
      } else {
        setIsComplete(true);
      }
    },
    [questionNo],
  );

  const onSubmit = () => {
    const answers = checkList
      .map((check, idx) => `${idx + 1}=${check}`)
      .join(' ');
    const post = { answers: answers };
    console.log(post);
  };

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 후 이용하실 수 있습니다.');
      navigate('/account');
    }
  }, []);

  return (
    <Container>
      {!isComplete ? (
        <QuestionBox>
          <div className="h-64 overflow-hidden rounded-lg">
            <IMG src={question.image} alt="questionImage" />
          </div>
          <Title>{question.question}</Title>
          <AnswerButton question={question} next={next} />
        </QuestionBox>
      ) : (
        <div>
          <Complete />
          <button className="buy-button" onClick={onSubmit}>
            제출
          </button>
        </div>
      )}
    </Container>
  );
};

export default SurveyPage;

const Container = tw.div`
  container
  mt-24
  px-5
  py-12
  mx-auto
  flex
  flex-col  
`;

const QuestionBox = tw.div` 
  lg:w-4/6
  mx-auto
`;

const IMG = tw.img` 
  object-cover
  object-center 
  h-full 
  w-full
`;

const Title = tw.h1` 
  text-center
  text-2xl
`;
