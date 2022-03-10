import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import { validLogin } from '../api';
import MyImageList from '../components/mypageform/MyImageList';
import Noti from '../components/mypageform/Noti';
import { loadMyPlant } from '../api/myPage';
import WishiCard from '../components/mypageform/WishiCard';
import Toast from '../components/global/Toast';

const msgList: any = {
  complete: '저장되었습니다',
  delete: '삭제되었습니다',
  nameNull: '정확한 이름을 적어주세요',
  waring: '처리 중 오류가 발생했습니다',
};

const MyPage = () => {
  const userInfo = useRecoilValue(validLogin);
  const [selected, setSelected] = useState<string[]>([]);
  const [userPlant, setUserPlant] = useState([]);
  const [ToastStatus, setToastStatus] = useState(false);
  const [ToastMsg, setToastMsg] = useState('');

  useEffect(() => {
    const user = userInfo?.username;
    loadMyPlant(user).then(res => setData(res));
  }, []);

  const setData = (res: any) => {
    setSelected(res.wishlist);
    const plantList = res.userplant;
    setUserPlant(plantList);
  };

  const handleToast = (type: any) => {
    setToastStatus(true);
    setToastMsg(msgList[type]);
  };

  useEffect(() => {
    if (ToastStatus) {
      setTimeout(() => {
        setToastStatus(false);
        setToastMsg('');
      }, 1000);
    }
  }, [ToastStatus]);

  return (
    <div
      className="relative mypage_div bg-gradation"
      style={{
        background: `rgba(243,255,244,0.1)
                    linear-gradient(180deg, rgba(243,255,244,0.1) 0%, rgba(255,249,246,0.7) 50%, rgba(255,238,246,1) 100%)`,
      }}
    >
      <div className="mypage_Container">
        {userInfo ? (
          <span className=" mypage_user">
            <I className="fas fa-leaf"></I>
            <H2>{userInfo.username}님</H2>
            <H3>안녕하세요!</H3>
          </span>
        ) : (
          <span className="mypage_user">
            <H2>누구시죠? 어케 들어오셨어요??</H2>
          </span>
        )}
        <div className="mypage_ImgBox">
          <H4>나의 반려식물</H4>
          <div className="detail_Modal-line"></div>
          <div className="mypage_ImgContainer">
            <MyImageList userPlant={userPlant} handleToast={handleToast} />
          </div>
        </div>
        <div className="mypage_SelectedDiv">
          <h4>찜 목록</h4>
          <div className="selected_container">
            {selected.length !== 0 ? (
              <div className="w-full">
                <div className="">
                  <ul className="w-8">
                    {selected.map((wishi, idx) => {
                      return <WishiCard key={`wishi${idx}`} wishi={wishi} />;
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <WishiBox>
                <span className="mt-8">아직 찜한 식물이 없어요!</span>
                <span className="mt-2">
                  당신에게 맞는 식물을 추천 받아보세요
                </span>
                <Link to="/survey">
                  <Btn>지금 이동!</Btn>
                </Link>
              </WishiBox>
            )}
          </div>
        </div>
      </div>
      {ToastStatus && <Toast msg={ToastMsg} />}
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
  ml-0
  sm:ml-2
`;

const H3 = tw.h3`
  mt-4
  text-black
  font-semibold 
  md:text-xl
  inline-block
  ml-0
  sm:ml-4
`;

const I = tw.i`
  ml-2
  text-4xl
  text-green-600
`;

const H4 = tw.h4`
  flex
  justify-center
  mb-3
  md:justify-start
`;

const WishiBox = tw.div`
  flex
  flex-col
  items-center
  justify-center
`;

const Btn = tw.button`
  w-full
  mx-3
  my-6
  h-3/6
  bg-sky-500
`;
