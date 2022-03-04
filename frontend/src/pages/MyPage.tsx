import React, { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../store/user';
import tw from 'tailwind-styled-components';
import ImagePreview from '../components/mypageform/MyImageUpload';
import UploadList from '../components/mypageform/UploadList';

const MyPage = () => {
  const userInfo = useRecoilValue(userAtom);
  const [files, setFiles] = useState<any[]>([]);
  const [imgUrl, setImgUrl] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [checked, setChecked] = useState(1);
  const [mainImg, setMainImg] = useState('/img/tree.png');

  useEffect(() => {
    setFiles(files.concat(imgUrl));
  }, [imgUrl]);

  return (
    <div className="flex items-center justify-center h-screen mt-24 md:mt-0">
      <div
        className="flex flex-col items-center p-0 mt-0 rounded-lg lg:mt-48 lg:p-10 drop-shadow-lg"
        style={{
          background: `rgba(243,255,244,0.1)
                        linear-gradient(180deg, rgba(243,255,244,0.1) 0%, rgba(255,249,246,0.7) 50%, rgba(255,238,246,1) 100%)`,
        }}
      >
        {userInfo ? (
          <span className="flex flex-col items-center justify-center sm:flex-row sm:items-end sm:justify-start sm:flex">
            <i className="ml-2 text-4xl text-green-600 fas fa-leaf"></i>
            <H2>{userInfo.email}님</H2>
            <H3>&nbsp;&nbsp;안녕하세요!</H3>
          </span>
        ) : (
          //   <H3>? 님 누구임?</H3>
          <span className="flex flex-col items-center justify-center mt-48 md:mt-24 sm:flex-row sm:items-end lg:mt-0 sm:justify-start sm:flex">
            <i className="ml-2 text-4xl text-green-600 fas fa-leaf"></i>
            <H2>&nbsp; dangedaeng.com님</H2>
            <H3>&nbsp;&nbsp;안녕하세요!</H3>
          </span>
        )}
        <div className="flex-col items-center justify-between w-3/4 p-3 mt-10 border-2 border-gray-400 border-dotted rounded-xl">
          <h4 className="flex justify-center mb-3 md:justify-start">
            나의 반려식물
          </h4>
          <div className="detail_Modal-line"></div>
          <div className="relative flex flex-col items-center justify-around w-full px-10 mt-3 sm:flex-row h-2/4 rounded-xl sm:px-0">
            <div className="flex flex-col w-full md:flex-row md:justify-between md:items-start">
              <div className="w-full lg:w-2/4 ">
                <img
                  className="object-fill w-full border-2 border-green-800 border-dashed md:w-96 md:h-96"
                  src={mainImg !== undefined ? mainImg : './img/tree.png'}
                  alt="선택된 이미지"
                />
              </div>
              <div className="flex flex-col items-end w-full md:pl-5 h-2/4 lg:pl-0 lg:w-2/4">
                <span className="flex justify-center w-full mt-10 mb-2 text-lg font-medium md:justify-end md:mt-1">
                  나만의 식물들
                </span>
                <ul className="flex items-center justify-center w-full lg:w-3/4">
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
                <div className="w-full mt-10 lg:w-2/4">
                  <div>
                    <ul>
                      <UploadList
                        id={1}
                        files={files}
                        checked={checked}
                        setFiles={setFiles}
                        setImgUrl={setImgUrl}
                      />
                      <UploadList
                        id={2}
                        files={files}
                        checked={checked}
                        setFiles={setFiles}
                        setImgUrl={setImgUrl}
                      />
                      <UploadList
                        id={3}
                        files={files}
                        checked={checked}
                        setFiles={setFiles}
                        setImgUrl={setImgUrl}
                      />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col items-center justify-between w-3/4 mt-10 h-2/4 sm:h-2/5 ">
          <h4>찜 목록</h4>
          <div className="flex justify-around w-full mt-3 border-2 border-gray-400 h-36 sm:h-3/4 rounded-xl">
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
