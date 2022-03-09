import React, { useState, useEffect, useCallback } from 'react';
import UploadList from './UploadList';
import ImagePreview from './MyImageUpload';
import { UserPlantList } from '../../store/type';

const MyImageList = ({ userPlant }: any) => {
  const [myList, setMyList] = useState<UserPlantList[]>([
    { id: 0, name: '없음', image: './img/tree.png', order: 1, user_id: 0 },
    { id: 0, name: '없음', image: './img/tree.png', order: 2, user_id: 0 },
    { id: 0, name: '없음', image: './img/tree.png', order: 3, user_id: 0 },
  ]);

  const [plantName, setPlantName] = useState<string[]>([]);
  const [plantImage, setPlantImage] = useState<string[]>([]);

  const [checked, setChecked] = useState(1);
  const [mainImg, setMainImg] = useState(myList[0].image);

  useEffect(() => {
    const result = myList;
    for (const key of userPlant) {
      if (key.order === 1) {
        result[0] = key;
      } else if (key.order === 2) {
        result[1] = key;
      } else {
        result[2] = key;
      }
    }
    setMyList(result);
    ImageChange();
    NameChange();
  }, [userPlant]);

  const ImageChange = () => {
    const changeImage = myList.map(list => list.image);
    setPlantImage(changeImage);
  };

  const NameChange = () => {
    const changeName = myList.map(list => list.name);
    setPlantName(changeName);
  };

  const ChangList = useCallback(
    (change: string, method: string, number: number) => {
      if (method === 'image') {
        const NewImage = myList;
        NewImage[number].image = change;
        setMyList(NewImage);
        ImageChange();
      } else if (method === 'name') {
        const NewName = myList;
        NewName[number].name = change;
        setMyList(NewName);
        NameChange();
      }
    },
    [myList],
  );

  const deleteList = useCallback(
    (number: number) => {
      const NewList = myList;
      for (const key of NewList) {
        if (key.order === number) {
          key.image = './img/tree.png';
          key.name = '없음';
        }
      }
      setMyList(NewList);
      ImageChange();
      NameChange();
    },
    [myList],
  );

  useEffect(() => {
    const MainImage = myList[checked - 1].image;
    setMainImg(MainImage);

    return;
  });

  return (
    <>
      <div className="mypage_ImgSet">
        <div className="w-full lg:w-2/4 ">
          <img className="mypage_Img " src={mainImg} alt="선택된 이미지" />
        </div>
        <div className="mypage_TitleBox">
          <span className="mypage_Title">나만의 식물들</span>
          <ul className="mypage_Ul">
            <ImagePreview
              files={plantImage}
              id={0}
              checked={checked}
              setChecked={setChecked}
            />

            <div className="px-2 mx-3 border-gray-300 border-x-2">
              <ImagePreview
                files={plantImage}
                id={1}
                checked={checked}
                setChecked={setChecked}
              />
            </div>

            <ImagePreview
              files={plantImage}
              id={2}
              checked={checked}
              setChecked={setChecked}
            />
          </ul>
          <div className="w-full mt-10 lg:w-3/4">
            <div>
              <ul>
                {myList.map((list: any) => {
                  return (
                    <UploadList
                      id={list.order}
                      image={plantImage}
                      checked={checked}
                      plantName={plantName}
                      setMyList={setMyList}
                      myList={myList}
                      ChangList={ChangList}
                      deleteList={deleteList}
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
