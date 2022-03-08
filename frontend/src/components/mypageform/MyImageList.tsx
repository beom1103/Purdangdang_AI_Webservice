import React, { useState } from 'react';
import UploadList from './UploadList';
import ImagePreview from './MyImageUpload';

const MyImageList = ({
  files,
  checked,
  setFiles,
  setImgUrl,
  setImgFile,
  imgFile,
  handleNamimg,
  plantName,
  deleteName,
  mainImg,
  setChecked,
  setMainImg,
}: any) => {
  const [myList, setMyList] = useState([
    { id: 0, name: '없음', image: './img/tree.png', order: 1 },
    { id: 0, name: '없음', image: './img/tree.png', order: 2 },
    { id: 0, name: '없음', image: './img/tree.png', order: 3 },
  ]);
  return (
    <>
      <div className="mypage_ImgSet">
        <div className="w-full lg:w-2/4 ">
          <img
            className="mypage_Img "
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
                {myList.map(list => {
                  return (
                    <UploadList
                      id={list.order}
                      files={files}
                      checked={checked}
                      setFiles={setFiles}
                      setImgUrl={setImgUrl}
                      setImgFile={setImgFile}
                      imgFile={imgFile}
                      handleNamimg={handleNamimg}
                      plantName={plantName}
                      deleteName={deleteName}
                    />
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyImageList;
