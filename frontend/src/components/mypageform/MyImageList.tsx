import React, { useState, useEffect, useCallback } from 'react';
import UploadList from './UploadList';
import ImagePreview from './MyImageUpload';
import { UserPlantList } from '../../store/type';
import tw from 'tailwind-styled-components';

type ImageListProps = {
  userPlant: UserPlantList[];
  handleToast: any;
};

const MyImageList: React.FC<ImageListProps> = ({ userPlant, handleToast }) => {
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

  const ImageChange = useCallback(() => {
    const changeImage = myList.map(list => list.image);
    setPlantImage(changeImage);
  }, [myList]);

  const NameChange = useCallback(() => {
    const changeName = myList.map(list => list.name);
    setPlantName(changeName);
  }, [myList]);

  const ChangList = useCallback(
    (change: string, method: string, number: number): void => {
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
    (number: number): void => {
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
      <div className="myPage_ImgSet">
        <div className="w-full lg:w-2/4 ">
          <img className="myPage_Img " src={mainImg} alt="선택된 이미지" />
        </div>
        <div className="myPage_TitleBox">
          <span className="myPage_Title">나만의 식물들</span>
          <ul className="myPage_Ul">
            <ImagePreview
              files={plantImage}
              id={0}
              checked={checked}
              setChecked={setChecked}
            />

            <Div>
              <ImagePreview
                files={plantImage}
                id={1}
                checked={checked}
                setChecked={setChecked}
              />
            </Div>

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
                      key={list.order}
                      id={list.order}
                      image={plantImage}
                      checked={checked}
                      plantName={plantName}
                      setMyList={setMyList}
                      myList={myList}
                      ChangList={ChangList}
                      deleteList={deleteList}
                      handleToast={handleToast}
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

const Div = tw.div`
  px-2
  mx-3
  border-gray-300
  border-x-2
`;
