import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { validLogin } from '../../api';
import { getDetailInfo } from '../../api/search';
import { Reviews } from '../../store/type';
import tw from 'tailwind-styled-components';

const PlantReview = () => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(validLogin);
  const { pathname } = useLocation();
  const reviews = useRecoilValue(getDetailInfo(pathname));

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 후 이용하실 수 있습니다.');
      navigate('/account');
    }
  }, []);
  return (
    <div>
      {reviews.map((user: Reviews): JSX.Element => {
        return (
          <ReviewBox>
            <div className="flex">
              <User>
                이름 : <span className="text-green-600">{user.username}</span>
              </User>
              <Rating>평점 :{user.score}</Rating>
            </div>
            <Review>review : {user.content}</Review>
          </ReviewBox>
        );
      })}
      <ButtonBox>
        <Button>리뷰쓰기</Button>
        <Button>더보기</Button>
      </ButtonBox>
    </div>
  );
};

export default PlantReview;

const ReviewBox = tw.div`
  mb-5 
  border-b 
  border-gray-300
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
