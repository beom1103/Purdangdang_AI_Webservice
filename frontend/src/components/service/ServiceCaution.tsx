import tw from 'tailwind-styled-components';

const ServiceCaution = () => {
  const caution = [
    {
      text: '식물 이미지 검색 및 질병 진단 서비스를 이용시 다음을 유의해주세요.',
    },
    {
      text: '1. 최대한 식물을 가깝게 찍어주세요.',
    },
    {
      text: '2. 하나의 식물만 나오게 해주세요.',
    },
    {
      text: '3. 질병 진단 서비스 이용시 관엽식물(잎이 있는 식물)만 가능합니다!'
    },
    {
      text: '+) 사과, 포도, 복숭아와 같은 식물의 적합한 기능으로. 다른 식물을 찍을시에는 정확한 결과가 나오지 않을 수 있습니다.',
    },
    {
      text: '4. 아래 예시를 참고해주세요.',
    },
  ];

  return (
    <div className="my-20 text-gray-600 body-font">
      <div className="container px-5 mx-auto">
        <CautionBox>
          <i className="text-3xl fas fa-quote-right" />
          <h3 className="m-3 text-lg leading-relaxed">
            서비스 이용시 주의사항
          </h3>
          {caution.map(i => {
            return <Text>{i.text}</Text>;
          })}

          <div className="inline-flex wrap">
            <Img src="img/valid.jpg" />
            <Img src="img/invalid.jpg" />
          </div>
          <Text>올바른 예(왼쪽), 올바르지 않은 예(오른쪽)</Text>
        </CautionBox>
      </div>
    </div>
  );
};

export default ServiceCaution;

const CautionBox = tw.div` 
  w-full 
  mx-auto 
  text-center 
  xl:w-1/2 
  lg:w-3/4
`;

const Text = tw.p` 
  text-lg 
  leading-relaxed 
  mb-7
`;

const Img = tw.img` 
  w-1/2 
  mx-3
`;
