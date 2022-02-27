import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';
import { methodAtom } from '../../api/search';
import { Reviews } from '../../store/type';

type ModalProps = {
  id: number;
  showReviewModal: MouseEventHandler<HTMLButtonElement>;
};

const ReviewModal: React.FC<ModalProps | any> = ({ id, showReviewModal }) => {
  const setMethod = useSetRecoilState(methodAtom);
  const [reviewState, setReviewState] = useState<Reviews | any>({});

  useEffect(() => {
    setReviewState({ ...reviewState, ['plant_id']: id });
  }, []);

  const onSubmit = () => {
    setMethod('post');
  };

  const onChangeInput = useCallback(
    e => {
      const { name, value } = e.target;
      setReviewState({ ...reviewState, [name]: value });
      console.log(reviewState);
    },
    [reviewState],
  );

  const drawStar = (e: any) => {
    e.target.style.width = `${e.target.value * 10}%`;
  };

  return (
    <Modal>
      <CloseButton onClick={showReviewModal}>
        <span className="pl-2">닫기</span>
      </CloseButton>
      <h3>별점</h3>
      <div className="wrap">
        {/* <Star>
          ★ ★ ★ ★ ★<FillStar onClick={drawStar}>★ ★ ★ ★ ★</FillStar>
          <Range type="range" value="1" step="1" min="0" max="5" />
        </Star> */}
      </div>
      <h3 className="mt-8">리뷰</h3>
      <TextArea name="content" onChange={onChangeInput} />
      <Button onClick={onSubmit}>제출</Button>
    </Modal>
  );
};

export default React.memo(ReviewModal);

const Modal = tw.div`
  bg-white
  backdrop-blur-md
  w-11/12
  md:w-3/5
  h-3/5
  relative
  p-10
  border
  rounded-md
  border-2
  `;

const TextArea = tw.textarea` 
  mt-8  
  w-full
  border-2
  border-gray-500
  p-3
  h-1/2
`;

const Button = tw.button`
  mt-8
  buy-button
  `;

const CloseButton = tw.i` 
  flex
  mr-3 
  justify-end
  cursor-pointer 
  fas 
  fa-door-open
  hover:scale-105
`;

const Star = tw.span`
  relative
  text-gray500
`;

const FillStar = tw.span`
  w-0
  absolute
  left-0
  text-yellow-500
  overflow-hidden
`;

const Range = tw.input`
  w-full
  h-full
  absolute
  left-0
  opacity-0
  cursor-pointer
`;
