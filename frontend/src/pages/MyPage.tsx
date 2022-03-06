import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';
import { validLogin } from '../api';
import ImagePreview from '../components/mypageform/MyImageUpload';
import UploadList from '../components/mypageform/UploadList';
import Noti from '../components/mypageform/Noti';

const MyPage = () => {
  const userInfo = useRecoilValue(validLogin);
  const [files, setFiles] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [plantName, setPlantName] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [checked, setChecked] = useState(1);
  const [mainImg, setMainImg] = useState('/img/tree.png');

  useEffect(() => {
    console.log(files);
    setFiles(files.concat(imgUrl));
    console.log(files);
  }, [imgUrl]);

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

  const onSubmit = () => {
    console.log('서버 전달', files, plantName);
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
          <span className="mypage_user">
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
            <div className="mypage_ImgSet">
              <div className="w-full lg:w-2/4 ">
                <img
                  className="mypage_Img"
                  src={mainImg !== undefined ? mainImg : './img/tree.png'}
                  alt="선택된 이미지"
                />
              </div>
              <div className="mypage_TitleBox">
                <span className="mypage_Title">나만의 식물들</span>
                <ul className="mypage_Ul">
                  <ImagePreview
                    files={files}
                    id={0}
                    checked={checked}
                    setChecked={setChecked}
                    setMainImg={setMainImg}
                  />
                  <div className="px-2 mx-3 border-gray-300 border-x-2">
                    <ImagePreview
                      files={files}
                      id={1}
                      checked={checked}
                      setChecked={setChecked}
                      setMainImg={setMainImg}
                    />
                  </div>

                  <ImagePreview
                    files={files}
                    id={2}
                    checked={checked}
                    setChecked={setChecked}
                    setMainImg={setMainImg}
                  />
                </ul>
                <div className="w-full mt-10 lg:w-3/4">
                  <div>
                    <ul>
                      <UploadList
                        id={1}
                        files={files}
                        checked={checked}
                        setFiles={setFiles}
                        setImgUrl={setImgUrl}
                        handleNamimg={handleNamimg}
                        plantName={plantName}
                        setPlantName={setPlantName}
                        deleteName={deleteName}
                      />
                      <UploadList
                        id={2}
                        files={files}
                        checked={checked}
                        setFiles={setFiles}
                        setImgUrl={setImgUrl}
                        handleNamimg={handleNamimg}
                        plantName={plantName}
                        setPlantName={setPlantName}
                        deleteName={deleteName}
                      />
                      <UploadList
                        id={3}
                        files={files}
                        checked={checked}
                        setFiles={setFiles}
                        setImgUrl={setImgUrl}
                        handleNamimg={handleNamimg}
                        plantName={plantName}
                        setPlantName={setPlantName}
                        deleteName={deleteName}
                      />
                    </ul>
                  </div>
                </div>
                {/* <Noti /> */}
                <button
                  className="w-full mt-10 bg-blue-500 md:w-1/6 hover:bg-blue-300 hover:text-black"
                  onClick={() => onSubmit()}
                >
                  저장
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mypage_SelectedDiv">
          <h4>찜 목록</h4>
          <div className="mypage_SelectedBox">
            {selected.length !== 0 ? (
              <div>asds</div>
            ) : (
              <div className="flex flex-col items-center justify-center ">
                <span className="mt-8">아직 찜한 식물이 없어요!</span>
                <span className="mt-2">
                  당신에게 맞는 식물을 추천 받아보세요
                </span>
                <button className="w-6/12 my-6 h-1/6 bg-sky-500">
                  지금 이동!
                </button>
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
