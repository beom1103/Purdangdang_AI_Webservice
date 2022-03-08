import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { validLogin } from '../api';
import questionList from '../store/questionList.json';
import tw from 'tailwind-styled-components';
import AnswerButton from '../components/surveypage/AnswerButton';
import Complete from '../components/surveypage/Complete';
import SurveyIntro from '../components/surveypage/SurveyIntro';
import ProgressBar from '../components/surveypage/ProgressBar';

const SurveyPage = () => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(validLogin);
  const [questionNo, setQuestionNo] = useState<number>(0);
  const [isConfirm, setIsConFirm] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [checkList, setCheckList] = useState<string[]>([]);
  const question = questionList[questionNo];

  const next = useCallback(
    e => {
      if (questionNo < 5) {
        const { value } = e.target;
        const newList = checkList;
        newList.push(value);
        setCheckList(newList);
        const upQuestionNo = questionNo + 1;
        setQuestionNo(upQuestionNo);
      } else {
        setIsComplete(true);
        onSubmit();
      }
    },
    [questionNo],
  );

  const onSubmit = () => {
    const answers = checkList
      .map((check, idx) => `${idx + 1}=${check}`)
      .join(' ');
    const post = { answers: answers };
  };

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 후 이용하실 수 있습니다.');
      navigate('/account');
    }
  }, []);

  return (
    <Container>
      {!isConfirm && <SurveyIntro setIsConFirm={setIsConFirm} />}
      {isConfirm && !isComplete ? (
        <QuestionBox>
          <div className="h-64 overflow-hidden rounded-lg">
            <IMG src={question.image} alt="questionImage" />
          </div>
          <Title>{question.question}</Title>
          <ProgressBar checkList={checkList} />
          <AnswerButton question={question} next={next} />
        </QuestionBox>
      ) : (
        isConfirm && <Complete user={isLogin} />
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

export const QuestionBox = tw.div` 
  lg:w-4/6
  mx-auto
`;

export const IMG = tw.img` 
  object-cover
  object-center 
  h-full 
  w-full
  sm:min-w-[600px]
`;

export const Title = tw.h1` 
  text-center
  text-2xl
`;
