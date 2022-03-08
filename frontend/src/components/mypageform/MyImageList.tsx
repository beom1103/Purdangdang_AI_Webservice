import React, { useState, useEffect } from 'react';
import UploadList from './UploadList';
import ImagePreview from './MyImageUpload';

const MyImageList = () => {
  const [myList, setMyList] = useState([
    { id: 0, name: '없음', image: './img/tree.png', order: 1 },
    { id: 0, name: '없음', image: './img/tree.png', order: 2 },
    { id: 0, name: '없음', image: './img/tree.png', order: 3 },
  ]);

  const [files, setFiles] = useState<string[]>([]);
  const [imgagefiles, setImgageFiles] = useState<string[]>([]);
  const [imgUrl, setImgUrl] = useState<string[]>([]);
  const [imgFile, setImgFile] = useState<any[]>([]);
  const [plantName, setPlantName] = useState<any[]>([]);

  const [checked, setChecked] = useState(1);
  const [mainImg, setMainImg] = useState('/img/tree.png');

  useEffect(() => {
    setFiles(files.concat(imgUrl));
  }, [imgUrl]);

  useEffect(() => {
    console.log(myList);
  }, [myList]);

  useEffect(() => {
    setImgageFiles(imgagefiles.concat(imgFile));
  }, [imgFile]);

  const handleNamimg = (number: number, name: string) => {
    // const setName = plantName;
    // setName.splice(number, 1, name);
    // setPlantName([...setName]);
    const ImageName = myList;
    ImageName[number - 1].name = name;
    setMyList(ImageName);
  };

  const deleteName = (number: number) => {
    const delName = plantName;
    delName.splice(number, 1);
    setPlantName([...delName]);
  };

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
              myList={myList}
              id={0}
              checked={checked}
              setChecked={setChecked}
              setMainImg={setMainImg}
            />
            <div className="px-2 mx-3 border-gray-300 border-x-2">
              <ImagePreview
                files={files}
                myList={myList}
                id={1}
                checked={checked}
                setChecked={setChecked}
                setMainImg={setMainImg}
              />
            </div>

            <ImagePreview
              files={files}
              myList={myList}
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
                      files={list.image}
                      checked={checked}
                      setFiles={setFiles}
                      setImgUrl={setImgUrl}
                      setImgFile={setImgFile}
                      imgFile={imgFile}
                      handleNamimg={handleNamimg}
                      // plantName={plantName}
                      plantName={list.name}
                      deleteName={deleteName}
                      setMyList={setMyList}
                      myList={myList}
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
