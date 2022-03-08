import { useEffect, useState } from 'react';
import DetailModal from './DetailModal';
import tw from 'tailwind-styled-components';

const UploadModal = ({ isModal, plantData }: any) => {
  const [detail, setDetail] = useState(false);
  const [plantName, setPlantName] = useState('');
  const [plantImage, setPlantImage] = useState('');
  const [plantPer, setPlantPer] = useState('');
  const [selectPlant, setSelectPlant] = useState(plantData.top1);

  const [selectBox, setSelectBox] = useState(1);

  const closeModal = () => {
    isModal(false);
  };

  const selectRank = (rank: number) => {
    switch (rank) {
      case 1:
        setSelectPlant(plantData.top1);
        setSelectBox(1);
        break;
      case 2:
        setSelectPlant(plantData.top2);
        setSelectBox(2);
        break;
      case 3:
        setSelectPlant(plantData.top3);
        setSelectBox(3);
        break;
    }
  };

  useEffect(() => {
    setPlantName(selectPlant.detail.kor);
    setPlantImage(selectPlant.detail.image_url);
    setPlantPer(selectPlant.percent);
    setSelectPlant(selectPlant);
  }, [selectPlant]);

  return (
    <div className="modal-div sticky-0 modal" onClick={() => closeModal()}>
      <div className="mt-10 modal-container ">
        <div
          className={`modal-background overflow-auto scroll ${
            detail
              ? `lg:scale-x-150 lg:scale-y-118 overflow-auto scroll-style`
              : null
          }`}
          onClick={e => e.stopPropagation()}
        >
          {detail ? (
            <DetailModal
              isModal={isModal}
              plantData={selectPlant}
            ></DetailModal>
          ) : (
            <div className="">
              <div className="modal-box ">
                <div className="flex justify-end w-full mb-8"></div>
                <p className="modal-title">이 댕댕이는?</p>
                <p className="modal-text">
                  {plantName}일 확률 {plantPer}.
                </p>

                <div className="modal-img">
                  <img
                    src={plantImage}
                    alt="결과 이미지"
                    className="w-full h-64"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="flex mb-3">
                  <ImgBox onClick={() => selectRank(1)}>
                    <span className="ml-1 text-center">top1</span>
                    <SelectedBorder
                      className={`${
                        selectBox === 1 ? `border-2 border-green-500` : null
                      }`}
                    >
                      <Img src={plantData.top1.detail.image_url} />
                    </SelectedBorder>
                  </ImgBox>
                  <ImgBox onClick={() => selectRank(2)}>
                    <span className="ml-1 text-center">top2</span>
                    <SelectedBorder
                      className={`${
                        selectBox === 2 ? `border-2 border-green-500` : null
                      }`}
                    >
                      <Img src={plantData.top2.detail.image_url} />
                    </SelectedBorder>
                  </ImgBox>
                  <ImgBox onClick={() => selectRank(3)}>
                    <span className="ml-1 text-center">top3</span>
                    <SelectedBorder
                      className={`${
                        selectBox === 3 ? `border-2 border-green-500` : null
                      }`}
                    >
                      <Img src={plantData.top3.detail.image_url} />
                    </SelectedBorder>
                  </ImgBox>
                </div>

                <div className="modal-next">이 댕댕이가 더 궁금하다면?</div>
                <div>
                  <button
                    className="upload-btn main-color"
                    onClick={() => setDetail(!detail)}
                  >
                    상세 정보
                  </button>
                  <Close onClick={() => closeModal()}>닫기</Close>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

const Close = tw.button`
  bg-transparent
  items-center
  w-32
  m-2
  border-2
  wrap
  hover:bg-gray-100
  h-9
  text-gray-600
`;

const Img = tw.img` 
  object-fill
  w-full 
  h-full
`;

const ImgBox = tw.div` 
  ml-5 
  w-14
  cursor-pointer
`;

const SelectedBorder = tw.div` 
  w-10 
  h-10
`;
