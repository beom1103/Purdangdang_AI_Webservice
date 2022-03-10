import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { PlantDisease } from '../../store/type';
import tw from 'tailwind-styled-components';

type DiseaseModalProps = {
  diseaseData: PlantDisease | any;
  setShowDisease: React.Dispatch<SetStateAction<boolean>>;
};

const DiseaseModal: React.FC<DiseaseModalProps> = ({
  diseaseData,
  setShowDisease,
}) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState('0px');
  const [filter, setFilter] = useState<string | null>(diseaseData.casuse);

  const contentSpace = useRef<HTMLDivElement | null>(null);
  const filters = ['cause', 'precaution', 'symptom'];

  const closeModal = () => {
    setShowDisease(false);
  };

  const toggleAccordian = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | any) => {
      const { value } = e.target;
      setActive(active === true ? false : true);

      setHeight(active ? '0px' : `${contentSpace?.current?.scrollHeight}px`);

      const newFilter = diseaseData[value];
      setFilter(newFilter);
    },
    [active, filter],
  );

  useEffect(() => {
    setFilter(diseaseData.cause);
  }, []);

  return (
    <ModalContainer>
      <ModalBox>
        <ModalImg
          src={diseaseData.image_url}
          alt="결과 이미지"
          style={{ objectFit: 'cover' }}
        />

        <Content>
          <h3 className="text-xl text-black">
            이 댕댕이의 질병은
            <span className="text-green-500"> {diseaseData.name}</span> 로
            추정됩니다.
            <p className="mt-2 text-center modal-text">
              아래를 클릭해서 더 자세하게 알아보세요.
            </p>
          </h3>

          <div>
            {filters.map((fil: string) => {
              return (
                <FilterBtn onClick={e => toggleAccordian(e)} value={fil}>
                  {fil}
                </FilterBtn>
              );
            })}
          </div>

          <Accordian ref={contentSpace} style={{ maxHeight: `${height}` }}>
            <p className="modal-text">{filter}</p>
          </Accordian>

          <button className="mt-3 buy-button" onClick={closeModal}>
            닫기
          </button>
        </Content>
      </ModalBox>
    </ModalContainer>
  );
};

export default DiseaseModal;

const ModalContainer = tw.div` 
modal-div modal modal-container
`;

const ModalBox = tw.div` 
mx-auto overflow-auto modal-background scroll scrollbar-hide
`;

const FilterBtn = tw.button` 
p-1 m-2 text-lg text-green-600 appearance-none cursor-pointer border-1 border-b-gray-500 focus:bg-green-500 focus:text-white
`;

const Accordian = tw.div` 
overflow-auto duration-700 ease-in-out transition-max-height scrollbar-hide
`;

const ModalImg = tw.img` 
w-full h-64
`;

const Content = tw.div` 
  mb-1 modal-box
`;
