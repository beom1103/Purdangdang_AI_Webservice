import { debounce } from 'lodash';
import React, {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';
import { methodAtom, reviewPostAtom, postReview } from '../../api/search';
import { Reviews } from '../../store/type';
import Star from './Star';

type ModalProps = {
  id: string;
  modifyReview: Reviews | undefined;
  showReviewModal: MouseEventHandler<HTMLButtonElement>;
};

const ReviewModal: React.FC<ModalProps> = ({
  id,
  modifyReview,
  showReviewModal,
}) => {
  const method = useRecoilValue(methodAtom);
  const [reviewState, setReviewState] = useRecoilState(reviewPostAtom);
  const { pathname } = useLocation();
  const { score, content } = reviewState;
  const disabledButton = score !== undefined && score > 0 && content.length > 0;

  const onSubmitReview = useCallback(async () => {
    if (!disabledButton) {
      alert('리뷰를 작성 후 제출해주세요!');
    } else {
      await postReview(pathname, method, reviewState);
      alert('등록 되었습니다.');
      window.location.reload();
    }
  }, [reviewState]);

  const onChangeInput = useCallback(
    e => {
      const { name, value } = e.target;
      setReviewState({ ...reviewState, [name]: value });
    },
    [reviewState],
  );

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      onSubmitReview();
    }
  };

  const debouncedContent = useMemo(() => {
    return debounce(onChangeInput, 100);
  }, [reviewState]);

  useEffect(() => {
    setReviewState({ ...reviewState, ['plant_id']: id });
  }, []);

  return (
    <Modal>
      <CloseButton onClick={showReviewModal}>
        <span className="pl-2">닫기</span>
      </CloseButton>
      <h3>별점</h3>
      <div className="wrap">
        <Star score={modifyReview?.score} />
      </div>
      <h3 className="mt-8">
        리뷰 <small>{content.length}/255자</small>
      </h3>
      <TextArea
        name="content"
        onChange={debouncedContent}
        onKeyPress={handleKeyPress}
        defaultValue={modifyReview?.content}
      />
      <Button onClick={() => onSubmitReview()}>제출</Button>
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
  mt-5  
  w-full
  border-2
  border-gray-500
  p-3
  h-1/3
`;

const Button = tw.button`
  mt-5
  buy-button
`;

const CloseButton = tw.i` 
  flex
  mr-3 
  justify-end
  cursor-pointer 
  fas 
  fa-door-open
 `;
