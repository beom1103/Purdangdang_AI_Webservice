import tw from 'tailwind-styled-components';
import { QuestionBox, Title } from '../../pages/SurveyPage';
import { User } from '../../store/type';

type CompleteProps = {
  user: User | undefined;
};

const Complete: React.FC<CompleteProps> = ({ user }) => {
  return (
    <QuestionBox className="animate-fade-in-up">
      <Title>검사를 완료하였습니다.</Title>

      <Title>
        <Green>{user?.username}</Green>님께 추천하는 푸르댕댕이는 다음과
        같습니다.
      </Title>
    </QuestionBox>
  );
};

export default Complete;

const Green = tw.span` 
  text-green-500
`;
