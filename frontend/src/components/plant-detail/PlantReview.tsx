import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { validLogin } from '../../api';
import {
  getDetailInfo,
  getMoreReview,
  methodAtom,
  postReview,
} from '../../api/search';
import { Reviews } from '../../store/type';
import tw from 'tailwind-styled-components';
import ReviewModal from '../modal/ReviewModal';

const PlantReview = () => {
  const user = useRecoilValue(validLogin);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams() as { name: string };

  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [method, setMethod] = useRecoilState(methodAtom);

  const [nextReview, setNextReview] = useState('');
  const [prevReview, setPrevReview] = useState('');

  const [modifyReview, setModifyReview] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchReviews = async () => {
    const newReviews = await getDetailInfo(pathname);
    setReviews(newReviews.results);
    setNextReview(newReviews.next);
    setPrevReview(newReviews.previous);

    newReviews.results.some((data: any): void => {
      if (data.username === user?.username) {
        console.log(data);
        setModifyReview(data);
      }
    });
  };

  const getNextReviews = async () => {
    const newReviews = await getMoreReview(nextReview);
    setReviews(newReviews.results);
    setNextReview(newReviews.next);
    setPrevReview(newReviews.previous);
  };

  const getPrevReviews = async () => {
    const newReviews = await getMoreReview(prevReview);
    setReviews(newReviews.results);
    setNextReview(newReviews.next);
    setPrevReview(newReviews.previous);
  };

  const showReviewModal = useCallback(() => {
    setMethod('post');
    setShowModal(!showModal);
    if (showModal) {
      document.body.style.overflow = 'unset';
    } else {
      window.scrollTo(0, 0);
      document.body.style.overflow = 'hidden';
    }
  }, [method, showModal]);

  const deleteReview = useCallback((): void => {
    postReview(pathname, 'delete');
    alert('삭제 되었습니다.');
    window.location.reload();
  }, [method]);

  const updateReview = useCallback((): void => {
    showReviewModal();
    setMethod('put');
  }, [method]);

  useEffect(() => {
    if (!user) {
      alert('로그인 후 이용하실 수 있습니다.');
      navigate('/account');
    }
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
                  {user?.username === data.username && (
                    <div className="relative inline-flex justify-between ml-5">
                      <SmallBtn onClick={updateReview}>수정</SmallBtn>
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
          <div className="flex-1">
            <PageBtn
              onClick={getPrevReviews}
              className="fa-arrow-left"
              hidden={!prevReview}
            />

            <PageBtn
              onClick={getNextReviews}
              className="fa-arrow-right"
              hidden={!nextReview}
            />
          </div>
          <Button hidden={modifyReview.length !== 0} onClick={showReviewModal}>
            리뷰쓰기
          </Button>
        </ButtonBox>
      )}
      {showModal && (
        <ModalOverlay>
          <ReviewModal
            showReviewModal={showReviewModal}
            id={params.name}
            modifyReview={modifyReview}
          />
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
  flex
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

const PageBtn = tw.i` 
  fas
  cursor-pointer
  text-green-500
  ml-5
  my-auto
`;
