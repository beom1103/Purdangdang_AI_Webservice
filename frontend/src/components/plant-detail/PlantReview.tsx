import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { validLogin } from '../../api';
import { getDetailInfo, methodAtom } from '../../api/search';
import { Reviews } from '../../store/type';
import tw from 'tailwind-styled-components';
import ReviewModal from '../modal/ReviewModal';

const PlantReview = () => {
  const isLogin = useRecoilValue(validLogin);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams() as { name: string };

  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [showModal, setShowModal] = useState(false);
  const setMethod = useSetRecoilState(methodAtom);

  const fetchReviews = async () => {
    const newReviews = await getDetailInfo(pathname);
    setReviews(newReviews);
  };

  const showReviewModal = () => {
    setMethod('post');
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (!isLogin) {
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
