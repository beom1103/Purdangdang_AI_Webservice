import React, {
  useCallback,
  ChangeEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import imageResize from '../homepage/ImageResize';
import { setMyPlant } from '../../api/myPage';
import { useRecoilValue } from 'recoil';
import { validLogin } from '../../api';
import { useNavigate } from 'react-router-dom';
import { deleteMyPlant } from '../../api/myPage';
import tw from 'tailwind-styled-components';
import { UserPlantList } from '../../store/type';

type ListProps = {
  id: number;
  checked: number;
  image: string[];
  plantName: string[];
  setMyList: React.Dispatch<React.SetStateAction<UserPlantList[]>>;
  myList: UserPlantList[];
  ChangList: any;
  deleteList: (type: number) => void;
  handleToast: (type: number) => void;
};
const UploadList = ({
  id,
  checked,
  image,
  plantName,
  setMyList,
  myList,
  ChangList,
  deleteList,
  handleToast,
}: ListProps) => {
  const navigate = useNavigate();
  const IMAGEROOT = './img/tree.png';
  const isLogin = useRecoilValue(validLogin);
  const [planttitle, setPlantTitle] = useState<string>('');
  const [edit, setEdit] = useState(false);
  const inputRef: any = useRef<HTMLInputElement | null>(null);

  const onClickFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];

      selectFiles = e.target?.files;

      const target = selectFiles[0].name;
      const file_kind = target.lastIndexOf('.');
      const file_name = target.substring(file_kind + 1, target.length);
      const file_type = file_name.toLowerCase();

      const check_file_type = ['jpg', 'gif', 'png', 'jpeg', 'bmp'];

      if (check_file_type.indexOf(file_type) === -1) {
        alert('사진 파일만 업로드 가능합니다');
        return;
      }

      imageResize({
        file: selectFiles[0],
        maxSize: 400,
      })
        .then(res => {
          setImage(res);
        })
        .catch(function (err) {
          console.error(err);
        });
    },
    [],
  );

  const setImage = useCallback(
    (res: any) => {
      console.log(res);
      const imageFile = res;
      const NewImage = myList;
      NewImage[id - 1].image = imageFile[1];
      setMyList(NewImage);
      ChangList(imageFile[1], 'image', id - 1);
    },
    [myList, id],
  );

  const handleDelete = useCallback(() => {
    const user = isLogin?.username;
    deleteList(id);
    deleteMyPlant(user, id)
      .then(ok => printToast('delete'))
      .catch(error => printToast('에러'));
  }, [isLogin, deleteList, deleteMyPlant, id]);

  const handleInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const name = e.currentTarget.value;
      setPlantTitle(name);
    },
    [setPlantTitle],
  );

  const editName = () => {
    setEdit(false);
    if (plantName[id - 1] !== '없음') {
      setPlantTitle(plantName[id - 1]);
    }
  };

  const checkName = useCallback(() => {
    const user = isLogin?.username;
    const NewName = myList;
    if (planttitle.length === 0 || planttitle === '없음') {
      printToast('nameNull');
    } else {
      NewName[id - 1].name = planttitle;
      const postImage = image[id - 1];
      setMyList(NewName);
      ChangList(planttitle, 'name', id - 1);
      setMyPlant(user, postImage, planttitle, id)
        .then(ok => printToast('complete'))
        .catch(error => printToast('에러'));
      setEdit(true);
    }
  }, [isLogin, myList, planttitle, image]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        checkName();
      }
    },
    [checkName],
  );

  const printToast = (msg: string) => {
    if (msg === 'complete') {
      handleToast(0);
    } else if (msg === 'delete') {
      handleToast(1);
    } else if (msg === 'nameNull') {
      handleToast(2);
    } else {
      handleToast(3);
    }
  };

  useEffect(() => {
    if (!isLogin) {
      alert('로그인 후 이용하실 수 있습니다.');
      navigate('/account');
    }
    if (plantName[id - 1] !== '없음') {
      setEdit(true);
    } else {
      setEdit(false);
    }
    return;
  }, []);

  useEffect(() => {
    if (inputRef.current !== null) inputRef.current.focus();
    return;
  });

  return (
    <>
      <li className="mb-2">
        {image[id - 1] !== IMAGEROOT ? (
          <Div>
            <Box>
              <span className="w-14">{id}.이름 : </span>
              {edit === false || plantName[id - 1] === '없음' ? (
                <Input
                  // type="text"
                  onChange={handleInput}
                  value={planttitle}
                  onKeyPress={handleKeyPress}
                  placeholder=" 이름 입력"
                  ref={inputRef}
                ></Input>
              ) : (
                <Span
                  className={` ${checked === id ? `text-green-500` : null}`}
                >
                  {plantName[id - 1]}
                </Span>
              )}
            </Box>
            <div>
              {edit === false || plantName[id - 1] === '없음' ? (
                <div>
                  <button className="bg-sky-400" onClick={() => checkName()}>
                    확인
                  </button>
                </div>
              ) : (
                <div>
                  <button className="bg-green-400 " onClick={() => editName()}>
                    수정
                  </button>
                  <button
                    className="bg-red-400 "
                    onClick={() => handleDelete()}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          </Div>
        ) : (
          <FileDiv>
            <span>{id}. 파일없음</span>
            <input
              type="file"
              id={String(id)}
              style={{ display: 'none' }}
              multiple={true}
              accept="image/*"
              onChange={onClickFiles}
            />
            <label
              className="text-white bg-green-400 rounded-md cursor-pointer"
              htmlFor={String(id)}
            >
              파일 선택
            </label>
          </FileDiv>
        )}
      </li>
    </>
  );
};

export default UploadList;

const Div = tw.div`
  flex
  justify-between
  md:justify-between
`;

const Box = tw.div`
  flex
  flex-row
  items-end
  w-40
  h-6
  lg:w-48
`;

const Input = tw.input`
  w-20
  h-6
  pl-2
  border
  border-gray-200
  resize-none
  lg:w-28
  rounded-xl
`;

const Span = tw.span`
  w-20
  lg:w-28
  h-6
  overflow-hidden
  text-ellipsis
  whitespace-nowrap
`;

const FileDiv = tw.div`
  flex
  justify-between
  md:justify-between
`;
