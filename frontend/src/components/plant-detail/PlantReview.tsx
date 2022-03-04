import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { validLogin } from '../../api';
import { getDetailInfo, methodAtom, postReview } from '../../api/search';
import { Reviews } from '../../store/type';
import tw from 'tailwind-styled-components';
import ReviewModal from '../modal/ReviewModal';

const PlantReview = () => {
  const user = useRecoilValue(validLogin);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams() as { name: string };

  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [method, setMethod] = useRecoilState(methodAtom);

  const fetchReviews = async () => {
    const newReviews = await getDetailInfo(pathname);
    setReviews(newReviews);
  };

  const showReviewModal = useCallback(() => {
    setMethod('post');
    setShowModal(!showModal);
  }, [method, showModal]);

  const deleteReview = useCallback((): void => {
    postReview(pathname, 'delete');
    alert('삭제 되었습니다.');
    window.location.reload();
  }, [method]);

  useEffect(() => {
    if (!user) {
      alert('로그인 후 이용하실 수 있습니다.');
      navigate('/account');
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      {reviews &&
        reviews.map((data: Reviews): JSX.Element => {
          return (
            <ReviewBox key={data.id}>
              <div className="flex">
                <User>
                  이름 : <span className="text-green-600">{data.username}</span>
                  {user.username === data.username && (
                    <div className="relative inline-flex justify-between ml-5">
                      <SmallBtn>수정</SmallBtn>
                      <SmallBtn onClick={deleteReview}>삭제</SmallBtn>
                    </div>
                  )}
                </User>

                <Rating>평점 :{data.score}</Rating>
              </div>
              <Review>review : {data.content}</Review>
            </ReviewBox>
          );
        })}
      {reviews && (
        <ButtonBox>
          <Button onClick={showReviewModal}>리뷰쓰기</Button>
          <Button>더보기</Button>
        </ButtonBox>
      )}
      {showModal && (
        <ModalOverlay>
          <ReviewModal showReviewModal={showReviewModal} id={params.name} />
        </ModalOverlay>
      )}
    </div>
  );
};

export default React.memo(PlantReview);

const ReviewBox = tw.div`
  mb-5 
  border-b 
  border-gray-300
`;
const ModalOverlay = tw.div`
  w-screen
  h-screen
  absolute
  left-0
  top-0
  wrap
  flex-col 
  backdrop-blur-sm
  overflow-hidden
`;

const SmallBtn = tw.button` 
  text-gray-500
  text-xs
  mr-3
  p-1
  bg-green-100
  border-none
`;

const Button = tw.button`
  px-6 
  py-2
  justify-end 
  mr-4
  bg-green-500 
  hover:bg-green-600
`;

const User = tw.h3`
  flex-1
  text-black
  mr-10 
  font-bold
  mb-3
`;

const Rating = tw.h3`
  flex
  text-yellow-500
  mb-3
`;

const Review = tw.p`
  text-black
  mb-3
  text-lg
  flex
`;

const ButtonBox = tw.div`
  flex
`;
