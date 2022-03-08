import tw from 'tailwind-styled-components';

const DetailModal = ({ isModal, plantData }: any) => {
  const plantName = plantData && plantData.detail.kor;
  const plantImage = plantData && plantData.detail.image_url;
  const plantScript = plantData && plantData.detail.description;
  const plantWater = plantData && plantData.detail.water_cycle;
  const plantSun = plantData && plantData.detail.sunlight;
  const plantTempe = plantData && plantData.detail.temperature;

  // const plantPer = plantData && plantData.percent;

  const closeModal = () => {
    isModal(false);
  };

  return (
    <Div>
      <Container>
        <div className="detail_Modal-title">상세 정보</div>
        <button className="detail_Modal-exit" onClick={() => closeModal()}>
          X
        </button>
      </Container>

      <div className="w-full lg:h-full lg:flex">
        <ImgBox>
          <Img
            src={plantImage}
            alt={plantName}
            style={{ objectFit: 'cover' }}
          />
        </ImgBox>
        <div className="detail_Modal-box">
          <div className="w-full ">
            <p className="detail_Modal-name">{plantName}</p>
          </div>

          <Line />
          <div className="w-full">
            <p className="px-8 my-4 lg:p-0 ">{plantScript}</p>
          </div>
          <Line />
        </div>
      </div>

      <div className="w-full mt-6 h-3/6">
        <div className="w-full px-8 lg:py-0">
          <Li>
            <LiBox>
              <I className="text-blue-500 fas fa-water"></I>
              <Span>물</Span>
            </LiBox>
            <Span>{plantWater}</Span>
          </Li>
          <Li>
            <LiBox>
              <I className="text-orange-500 fas fa-sun"></I>
              <Span>햇빛</Span>
            </LiBox>
            <Span>{plantSun}</Span>
          </Li>
          <Li>
            <LiBox>
              <I className="text-green-500 fas fa-temperature-low"></I>
              <Span>온도</Span>
            </LiBox>
            <Span>{plantTempe}</Span>
          </Li>
          <Line />
        </div>

        <div className="detail_Modal-btnBox">
          <button onClick={() => closeModal()} className="detail_Modal-btn">
            닫기
          </button>
        </div>
      </div>
    </Div>
  );
};

export default DetailModal;

const Div = tw.div`
  flex
  flex-col
  items-center
  w-full
  h-full
`;

const Container = tw.div`
  flex
  justify-between
  w-full
  mb-0
  bg-green-50
  lg:mb-7
  border-b-2
  border-gary-500
`;

const ImgBox = tw.div`
  w-full
  lg:pl-6
  lg:h-full
  lg:w-2/4
`;

const Img = tw.img` 
  w-full 
  h-full
  border-2 
  border-gray-500 
  lg:rounded-md
`;

const I = tw.i`
  detail_Modal-i
`;

const Li = tw.li` 
  detail_Modal-li
`;

const LiBox = tw.div` 
  flex items-center
`;

const Line = tw.div` 
  detail_Modal-line
`;

const Span = tw.span` 
  items-center
  test-sm
`;
