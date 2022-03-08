import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import { validLogin } from '../api';
import ImagePreview from '../components/mypageform/MyImageUpload';
import UploadList from '../components/mypageform/UploadList';
import MyImageList from '../components/mypageform/MyImageList';
import Noti from '../components/mypageform/Noti';
import { loadMyPlant } from '../api/myPage';
import WishiCard from '../components/mypageform/WishiCard';
import { setMyPlant } from '../api/myPage';

const MyPage = () => {
  // const isLogin = useRecoilValue(validLogin);
  const userInfo = useRecoilValue(validLogin);
  const [files, setFiles] = useState<string[]>([]);
  const [imgagefiles, setImgageFiles] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [imgFile, setImgFile] = useState<any[]>([]);
  const [plantName, setPlantName] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(1);
  const [mainImg, setMainImg] = useState('/img/tree.png');

  useEffect(() => {
    const user = userInfo?.username;
    loadMyPlant(user).then(res => setData(res));

    // console.log(loadData);
  }, []);

  // let myImgUrl: any[] = [];
  // let imgName: any[] = [];

  const setData = (res: any) => {
    setSelected(res.wishlist);
    // const plantList = res.userplant;
    // for (const i of plantList) {
    //   if (i.order === 1) {
    //     myImgUrl = [...myImgUrl, `/backend` + i.image];
    //     imgName = [...imgName, i.name];
    //   } else if (i.order === 2) {
    //     myImgUrl = [...myImgUrl, `/backend` + i.image];
    //     imgName = [...imgName, i.name];
    //   } else if (i.order === 3) {
    //     myImgUrl = [...myImgUrl, `/backend` + i.image];
    //     imgName = [...imgName, i.name];
    //   }
    //   setFiles(myImgUrl);
    //   setPlantName(imgName);
    //   setImgFile(imgUrl);
    // }
  };

  // useEffect(() => {
  //   console.log('파일', files);
  //   console.log('이름', plantName);
  //   console.log('이미지 파일', imgFile);
  // }, [files, plantName]);

  useEffect(() => {
    setFiles(files.concat(imgUrl));
  }, [imgUrl]);

  useEffect(() => {
    setImgageFiles(imgagefiles.concat(imgFile));
    // console.log('이미지파일즈', imgagefiles);
  }, [imgFile]);

  const handleNamimg = (number: number, name: string) => {
    const setName = plantName;
    setName.splice(number, 1, name);
    setPlantName([...setName]);
  };

  const deleteName = (number: number) => {
    const delName = plantName;
    delName.splice(number, 1);
    setPlantName([...delName]);
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
            <H2>&nbsp; {userInfo.email}님</H2>
            <H3>&nbsp;&nbsp;안녕하세요!</H3>
          </span>
        ) : (
          //   <H3>? 님 누구임?</H3>
          <span className="mypage_user">
            <i className="ml-2 text-4xl text-green-600 fas fa-leaf"></i>
            <H2>&nbsp; dangedaeng.com님</H2>
            <H3>&nbsp;&nbsp;안녕하세요!</H3>
          </span>
        )}
        <div className="mypage_ImgBox">
          <h4 className="flex justify-center mb-3 md:justify-start">
            나의 반려식물
          </h4>
          <div className="detail_Modal-line"></div>
          <div className="mypage_ImgContainer">
            <MyImageList
              files={files}
              mainImg={mainImg}
              checked={checked}
              setChecked={setChecked}
              setMainImg={setMainImg}
              setFiles={setFiles}
              setImgUrl={setImgUrl}
              setImgFile={setImgFile}
              imgFile={imgFile}
              handleNamimg={handleNamimg}
              plantName={plantName}
              deleteName={deleteName}
            />
          </div>
        </div>
        <div className="mypage_SelectedDiv">
          <h4>찜 목록</h4>
          <div className="mb-12 overflow-hidden overflow-x-scroll snap-x whitespace-nowrap mypage_SelectedBox">
            {selected.length !== 0 ? (
              <div className="w-full">
                <div className="">
                  <ul className="w-8 lg:w-4/5">
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
