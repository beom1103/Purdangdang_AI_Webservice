import tw from 'tailwind-styled-components';
import { QuestionBox, Title } from '../../pages/SurveyPage';
import { User } from '../../store/type';
import fake from '../../store/fake.json';
import { useEffect, useRef, useState } from 'react';

type CompleteProps = {
  user: User | undefined;
};

let count = 0;
let slideInterval: any;

const Complete: React.FC<CompleteProps> = ({ user }) => {
  const TOTAL_SLIDES = fake.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<any>(null);

  const nextSlide = () => {
    count = (count + 1) % TOTAL_SLIDES;
    setCurrentSlide(count);
    slideRef !== null && slideRef?.current.classList.add('animate-fade-in-up');
  };

  const prevSlide = () => {
    count = (count - 1) % TOTAL_SLIDES;
    setCurrentSlide(count);
    slideRef.current.classList.add('animate-fade-in-up');
  };

  const startSlider = () => {
    slideInterval = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const removeAnimation = () => {
    slideRef !== null &&
      slideRef.current.classList.remove('animate-fade-in-up');
  };

  useEffect(() => {
    slideRef.current?.addEventListener('animationend', removeAnimation);

    slideRef.current?.addEventListener('mouseenter', pauseSlider);

    slideRef.current?.addEventListener('mouseleave', startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
  }, []);

  return (
    <div>
      <QuestionBox className="animate-fade-in-up">
        <Title>검사를 완료하였습니다.</Title>
        <Title>
          <Green>{user?.username}</Green>님께 추천하는 푸르댕댕이는 다음과
          같습니다.
        </Title>

        <div className="max-w-screen-xl m-auto">
          <div ref={slideRef} className="relative w-full select-none">
            {/* {fake.map((idx: any) => {
              <div className="aspect-w-16 aspect-hs-9">
                <img src={idx[currentSlide].image_url} alt="s" />
                <img src={idx[currentSlide].image_url} alt="s" />
                <img src={idx[currentSlide].image_url} alt="s" />
              </div>;
            })} */}
            <Img src={fake[currentSlide].image_url} alt="s" />

            <div className="absolute justify-between w-full px-2 transform -translate-y-1/2 top-1/2 center">
              <button onClick={nextSlide}>이전</button>
              <button onClick={prevSlide}>다음</button>
            </div>
          </div>
        </div>
      </QuestionBox>
    </div>
  );
};

export default Complete;

const Green = tw.span` 
  text-green-500
`;

const Img = tw.img` 
  ease-out
  delay-500
`;
