import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../store/user';
import review from '../../store/review.json';
import tw from 'tailwind-styled-components';

const PlantReview = () => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(userAtom);

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 후 이용하실 수 있습니다.');
      navigate(-1);
    }
  }, []);

  return (
    <div>
      {review.map(i => {
        return (
          <ReviewBox>
            <User>
              이름 : <span className="text-green-600">{i.username}</span>
            </User>
            <Rating>평점 : {i.rating}</Rating>
            <Review>review : {i.review}</Review>
          </ReviewBox>
        );
      })}
      <Button>더보기</Button>
    </div>
  );
};

export default PlantReview;

const ReviewBox = tw.div`
  flex
  mb-5 
  border-b 
  border-gray-300
`;

const Button = tw.button`
  buy-button
`;

const User = tw.h3`
  flex-1
  text-black
  mr-10 
  font-bold
  mb-3
`;

const Rating = tw.h3`
  wrap
  flex
  text-yellow-500
  mb-3
`;

const Review = tw.p`
  text-black
  mb-3
  text-lg
  flex-none
`;
