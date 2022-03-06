/* eslint-disable @typescript-eslint/no-var-requires */
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import UploadModal from './UploadModal';
import imageResize from './ImageResize';
import tw from 'tailwind-styled-components';
import axios, { AxiosInstance } from 'axios';
import { preview } from '../../api/search';
import { boolean } from 'yup';
import UploadLading from '../load-page/UploadLoading';

const UploadContainer = ({ setIsModal }: any) => {
  //드래그 중일때와 아닐 때의 스타일을 구분하기 위한 state 변수
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);
  const [plantData, setPlantData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  // Modal 띄우기 여부
  const [showModal, setShowModal] = useState(false);

  // 드래그 이벤트를 감지한 ref 참조변수 (label 태그에 들어갈 예정)
  const dragRef = useRef<HTMLLabelElement | null>(null);
  const clickRef = useRef<HTMLLabelElement | null>(null);

  const [imgBox, setImgBox] = useState<any[]>([]);

  const openModal = () => {
    if (files.length !== 0) {
      setShowModal(!showModal);
    } else {
      alert('ㅋㅋ 파일 없음');
    }
  };

  useEffect(() => {
    setIsModal(showModal);

    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else if (!showModal) {
      document.body.style.overflow = `visible `;
    }
  }, [showModal]);

  const onClickFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];

      console.log('클릭?');

      selectFiles = e.target?.files;
      // checkFile(selectFiles[0].name);

      const target = selectFiles[0].name;
      const file_kind = target.lastIndexOf('.');
      const file_name = target.substring(file_kind + 1, target.length);
      const file_type = file_name.toLowerCase();

      const check_file_type = ['jpg', 'gif', 'png', 'jpeg', 'bmp'];

      if (check_file_type.indexOf(file_type) === -1) {
        alert('님 이거 사진 아니자늠');
        return;
      }
      setIsLoading(false);
      imageResize({
        file: selectFiles[0],
        maxSize: 400,
      })
        .then(res => {
          imageCheck(res);
        })
        .catch(function (err) {
          console.error(err);
        });
    },
    [files],
  );

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];

      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }

      const target = selectFiles[0].name;
      const file_kind = target.lastIndexOf('.');
      const file_name = target.substring(file_kind + 1, target.length);
      const file_type = file_name.toLowerCase();

      const check_file_type = ['jpg', 'gif', 'png', 'jpeg', 'bmp'];

      if (check_file_type.indexOf(file_type) === -1) {
        alert('님 이거 사진 아니자늠');
        return;
      }

      setFiles(selectFiles);
      setIsLoading(false);
      imageResize({
        file: selectFiles[0],
        maxSize: 400,
      })
        .then(res => {
          imageCheck(res);
        })
        .catch(function (err) {
          console.error(err);
        });
    },
    [files],
  );

  const imageCheck = (res: any) => {
    // console.log('파일', file, res[0]);
    const file = res;
    setFiles(file);
    preview(file)
      .then(data => setPlantData(data))
      .then(check => setIsLoading(true));

    const imgEl: any = document.querySelector('.dragContainer');

    imgEl.style.backgroundImage = `url(${res[1]})`;
  };

  const handleFilterFile = useCallback((): void => {
    setFiles([]);
    setIsLoading(true);

    const imgEl: any = document.querySelector('.dragContainer');
    imgEl.style.backgroundImage = `url(${null})`;
  }, [files]);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles],
  );

  const handleClick = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles],
  );

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
    // clickEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className="relative flex">
      {isLoading ? null : <UploadLading />}
      <div
        className="upload-container "
        style={{
          background: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url(/img/10.jpg)`,
          backgroundSize: 'cover',
        }}
      >
        <div
          className="upload-div "
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        >
          <Div>
            <Container>
              <input
                type="file"
                id="fileUpload"
                style={{ display: 'none' }}
                multiple={true}
                accept="image/*"
                onChange={onChangeFiles}
              />
              <label htmlFor="fileUpload" ref={dragRef}>
                <div
                  className={`drop-container dragContainer   ${
                    isDragging ? `bg-slate-200` : 'bg-gray-50'
                  }`}
                >
                  <span
                    className={` hidden md:block ${
                      files.length === 0 ? `visible` : `invisible`
                    } font-bold mb-5`}
                  >
                    Drag & Drop <br />
                    <br />
                    파일 선택
                  </span>
                  <img
                    className={`w-20 h-20 ${
                      isDragging ? `animate-fade-in-up` : `null`
                    } ${files.length === 0 ? `visible` : `invisible`} `}
                    src="./img/upload.png"
                    alt="업로드 이미지"
                  />
                </div>
              </label>
            </Container>
            <Span>
              {/* 파일명 : &nbsp; */}
              {files.length > 0 && (
                <span>
                  <span>업로드 이미지</span>
                  <span
                    className="cursor-pointer drags hover:text-rose-500"
                    onClick={() => handleFilterFile()}
                  >
                    &nbsp; 삭제 X
                  </span>
                </span>
              )}
            </Span>
            <P>어떤 식물인지 궁금하다면 푸르댕댕에 맡겨주세요!</P>

            <div className="upload-btnContainer md:flex-row">
              <button className="upload-btn main-color">
                <input
                  type="file"
                  id="clickUpload"
                  style={{ display: 'none' }}
                  multiple={true}
                  accept="image/*"
                  onChange={onClickFiles}
                />
                <label htmlFor="clickUpload" ref={clickRef}>
                  이미지 등록
                </label>
              </button>
              <button
                className={`upload-btn  ${
                  isLoading
                    ? `pointer-events-auto main-color`
                    : `pointer-events-none bg-gray-300`
                }`}
                onClick={() => openModal()}
              >
                식물 검사
              </button>
            </div>
          </Div>
        </div>
      </div>

      {showModal ? (
        <Modal>
          <UploadModal
            isModal={setShowModal}
            plantData={plantData}
          ></UploadModal>
        </Modal>
      ) : null}
    </div>
  );
};

export default UploadContainer;

const Div = tw.div`
  flex
  flex-col
  items-center
  justify-center
  w-full
`;

const Container = tw.div`
  hidden
  w-3/5
  py-2
  h-2/5
  sm:block
  md:h-72
  lg:h-96
`;

const Span = tw.span`
  py-3
  text-xs
  font-bold
  text-white
`;

const P = tw.p`
  upload-text
  2xl:text-2xl
  2xl:block
  lg:text-1xl
  lg:blok
`;

const Modal = tw.div`
  fixed
  z-50
  w-screen
  h-screen
`;
