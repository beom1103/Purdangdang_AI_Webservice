import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import { validLogin } from '../api';
import MyImageList from '../components/mypageform/MyImageList';
import { loadMyPlant } from '../api/myPage';
import WishiCard from '../components/mypageform/WishiCard';

const MyPage = () => {
  const userInfo = useRecoilValue(validLogin);
  const [selected, setSelected] = useState<string[]>([]);
  const [userPlant, setUserPlant] = useState([]);

  useEffect(() => {
    const user = userInfo?.username;
    loadMyPlant(user).then(res => setData(res));
  }, []);

  const setData = (res: any) => {
    setSelected(res.wishlist);
    const plantList = res.userplant;
    setUserPlant(plantList);
  };

  return (
    <div className="mypage_div">
      <div
        className="mypage_Container"
        style={{
          background: `rgba(243,255,244,0.1)
                        linear-gradient(180deg, rgba(243,255,244,0.1) 0%, rgba(255,249,246,0.7) 50%, rgba(255,238,246,1) 100%)`,
        }}
      >
        {userInfo ? (
          <span className="pt-16 mypage_user">
            <i className="ml-2 text-4xl text-green-600 fas fa-leaf"></i>
            <H2>&nbsp; {userInfo.username}님</H2>
            <H3>&nbsp;&nbsp;안녕하세요!</H3>
          </span>
        ) : (
          <span className="mypage_user">
            <H2>누구시죠? 어케 들어오셨어요??</H2>
          </span>
        )}
        <div className="mypage_ImgBox">
          <h4 className="flex justify-center mb-3 md:justify-start">
            나의 반려식물
          </h4>
          <div className="detail_Modal-line"></div>
          <div className="mypage_ImgContainer">
            <MyImageList userPlant={userPlant} />
          </div>
        </div>
        <div className="mypage_SelectedDiv">
          <h4>찜 목록</h4>
          <div className="mb-12 overflow-hidden overflow-x-scroll snap-x whitespace-nowrap mypage_SelectedBox">
            {selected.length !== 0 ? (
              <div className="w-full">
                <div className="">
                  <ul className="w-8">
                    {selected.map((wishi, index) => {
                      return <WishiCard key={index} wishi={wishi} />;
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center ">
                <span className="mt-8">아직 찜한 식물이 없어요!</span>
                <span className="mt-2">
                  당신에게 맞는 식물을 추천 받아보세요
                </span>
                <Link to="/survey">
                  <button className="w-full my-6 h-3/6 bg-sky-500">
                    지금 이동!
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;

const H2 = tw.h2`
  mt-4 
  text-4xl
  font-bold 
  text-black
  inline-block
`;

const H3 = tw.h3`
  mt-4
  text-black
  font-semibold 
  md:text-xl
  inline-block
`;
