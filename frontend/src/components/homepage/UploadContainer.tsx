/* eslint-disable @typescript-eslint/no-var-requires */
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import UploadModal from '../modal/UploadModal';
import imageResize from './ImageResize';
import tw from 'tailwind-styled-components';
import { postAiModel } from '../../api/search';
import UploadLading from '../load-page/UploadLoading';
import { PlantDisease, PlantDataType } from '../../store/type';
import { useRecoilValue } from 'recoil';
import { validLogin } from '../../api';
import DiseaseModal from '../modal/DiseaseModal';

type UploadContainerProps = {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleToast: any;
};

const UploadContainer: React.FC<UploadContainerProps> = ({
  setIsModal,
  handleToast,
}) => {
  const user = useRecoilValue(validLogin);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [plantData, setPlantData] = useState<PlantDataType>({});
  const [diseaseData, setDiseaseData] = useState<PlantDisease>({});
  const [isLoading, setIsLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showDisease, setShowDisease] = useState(false);

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const clickRef = useRef<HTMLLabelElement | null>(null);
  const imageDivRef = useRef<HTMLDivElement | null>(null);

  const openModal = () => {
    if (files.length !== 0) {
      setShowModal(!showModal);
    } else {
      alert('등록한 파일이 없습니다.');
    }
  };

  const openDiseaseModal = () => {
    if (files.length !== 0) {
      setShowDisease(!showDisease);
    } else {
      alert('등록한 파일이 없습니다.');
    }
  };

  const handleFiles = (e: ChangeEvent<HTMLInputElement> | any) => {
    let selectFiles = [];

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
      alert('잘못된 형식의 파일입니다.');
      return;
    }

    return selectFiles[0];
  };

  const uploadImageFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      const image = handleFiles(e);
      imageResize({
        file: image,
        maxSize: 400,
      })
        .then((res: any) => {
          imageCheck(res);
        })
        .then(ok => handleToast('ok'))
        .catch(function (err) {
          console.error(err);
        });
    },
    [files],
  );

  const imageCheck = async (res: File[]) => {
    const file = res;
    setFiles(file);
    const imgEl = document.querySelector('.dragContainer') as HTMLDivElement;

    imgEl.style.backgroundImage = `url(${res[1]})`;
  };

  const postSearchPlant = useCallback(() => {
    setIsLoading(false);
    postAiModel(files, 'species')
      .then(data => setPlantData(data))
      .then(check => setIsLoading(true))
      .then(() => openModal());
  }, [files]);

  const postDiseasePlant = useCallback(() => {
    if (user) {
      setIsLoading(false);
      postAiModel(files, 'disease')
        .then(data => setDiseaseData(data))
        .then(check => setIsLoading(true))
        .then(() => openDiseaseModal());
    } else {
      alert('회원만 이용할 수 있습니다.');
    }
  }, [files]);

  const handleFilterFile = useCallback((): void => {
    setFiles([]);
    setIsLoading(true);

    const imgEl: HTMLDivElement | null = imageDivRef.current;
    if (imgEl !== null) {
      imgEl.style.backgroundImage = `url(${null})`;
    }
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

      uploadImageFiles(e);
      setIsDragging(false);
    },
    [uploadImageFiles],
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

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  useEffect(() => {
    setIsModal(showModal);
    setShowDisease(showDisease);
    if (showModal || showDisease) {
      document.body.style.overflow = 'hidden';
    } else if (!showModal || !showDisease) {
      document.body.style.overflow = `visible `;
    }
  }, [showModal, showDisease]);

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
                onChange={uploadImageFiles}
              />
              <label htmlFor="fileUpload" ref={dragRef}>
                <div
                  className={`drop-container dragContainer   ${
                    isDragging ? `bg-slate-200` : 'bg-gray-50'
                  }`}
                  ref={imageDivRef}
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
              {files.length > 0 && (
                <span>
                  <span>업로드 이미지</span>
                  <span
                    className="cursor-pointer drags hover:text-rose-500"
                    onClick={handleFilterFile}
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
                  onChange={uploadImageFiles}
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
                onClick={() => postSearchPlant()}
              >
                식물 검사
              </button>
              <button
                className={`upload-btn  ${
                  isLoading
                    ? `pointer-events-auto main-color`
                    : `pointer-events-none bg-gray-300`
                }`}
                onClick={() => postDiseasePlant()}
              >
                질병 진단
              </button>
            </div>
          </Div>
        </div>
      </div>

      {showModal && (
        <Modal>
          <UploadModal
            isModal={setShowModal}
            plantData={plantData}
          ></UploadModal>
        </Modal>
      )}
      {showDisease && (
        <Modal>
          <DiseaseModal
            diseaseData={diseaseData}
            setShowDisease={setShowDisease}
          />
        </Modal>
      )}
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
