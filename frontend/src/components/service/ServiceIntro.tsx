import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const ServiceIntro = () => {
  return (
    <IntroContainer>
      <TitleBox>
        <Title>푸르댕댕은...</Title>
      </TitleBox>
      <TextBox>
        <h3 className="text-lg font-bold text-white">
          푸르댕댕은 푸르른 반려식물을 댕댕이로 표현한 이름입니다. 나의 공간으로
          식물을 초대. 식물의 공간으로 떠나는 산책. 반려식물의 첫만남에 도움이
          되길 희망합니다. 푸른댕댕이와 만남을 위한 산책을 떠나보시죠.
          <div className="my-3" />
          저희 푸르댕댕은 약 300,000 장의 데이터로 학습한 AI model을 기반으로 서비스 하고 있습니다. 푸르댕댕은 여러분이 궁금한 식물을 찾아주고, 식물을 키우는 데 있어 가이드라인을 제공하는 웹서비스 입니다. 
          푸르댕댕과 함께 "식물이 있는 삶"의 즐거움을 느껴보세요.  
        </h3>
      </TextBox>
      <Link to="/">
        <Button>푸르댕댕 서비스 이용하러 가기</Button>
      </Link>
    </IntroContainer>
  );
};

export default ServiceIntro;

const IntroContainer = tw.div` 
  relative 
  max-w-xl 
  text-center 
  sm:text-left 
  md:w-4/6 
  xl:w-1/2 
  md:mr-20
`;

const TitleBox = tw.div` 
  mx-auto 
  mb-8 
  text-4xl 
  font-light 
  leading-snug 
  prose-titles 
  max-w-3xs 
  sm:max-w-none 
  sm:mx-0 
  lg:text-5xl 
  lg:mb-15
`;

const TextBox = tw.div` 
  p-3 
  text-sm 
  bg-gray-900 
  bg-opacity-50 
  mb-14 
  sm:text-lg 
  sm:mb-18 
  lg:text-xl
`;

const Title = tw.div` 
  inline-block 
  text-3xl 
  text-green-400 
  mt-28 
  md:mt-0
`;

const Button = tw.button` 
  justify-between 
  p-3 
  mb-6 
  text-white 
  bg-green-600 
  rounded-lg 
  sm:mb-0 
  flex-grow- 
  xs:w-auto 
  hover:bg-green-700
`;
