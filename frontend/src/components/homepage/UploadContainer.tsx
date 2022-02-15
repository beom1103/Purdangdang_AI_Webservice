import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { blob } from 'stream/consumers';

interface IFileTypes {
  id: number;
  object: File;
}

const UploadContainer = () => {
  //드래그 중일때와 아닐 때의 스타일을 구분하기 위한 state 변수
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<any[]>([]);

  // 각 선택했던 파일들의 고유값 id
  const fileId = useRef<number>(0);

  // 드래그 이벤트를 감지한 ref 참조변수 (label 태그에 들어갈 예정)
  const dragRef = useRef<HTMLLabelElement | null>(null);

  // const saveFileImage = (e) => { setFileImage(URL.createObjectURL(e.target.files[0])); };

  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      const tempFiles: IFileTypes[] = files;

      console.log(isDragging);

      if (e.type === 'drop') {
        selectFiles = e.dataTransfer.files;
      } else {
        selectFiles = e.target.files;
      }
      preview(selectFiles);
      setFiles(selectFiles);
    },
    [files],
  );

  const preview = (select: any) => {
    const imgEl: any = document.querySelector('.dragContainer');

    const reader = new FileReader();

    console.log(select);

    reader.onloadend = () => {
      if (select.length > 0) {
        imgEl.style.backgroundImage = `url(${reader.result})`;
        console.log(reader.result);
      }
    };
    if (select === null) {
      imgEl.style.backgroundImage = `url()`;
    }

    reader.readAsDataURL(select !== null ? select[0] : null);
    // reader.readAsDataURL(select[0]);
  };

  const handleFilterFile = useCallback((): void => {
    setFiles([]);
    preview(null);
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

  return (
    <div
      className="flex justify-between w-full h-screen"
      style={{
        background: `linear-gradient(
          to right,
          rgba(20, 20, 20, 0) 10%,
          rgba(255, 255, 255, 0.25) 20%,
          rgb(255, 255, 255, 0.5) 30%,
          rgb(255, 255, 255, 0.8) 55%,
          rgb(255, 255, 255) 70%,
          rgb(255, 255, 255) 100%
        ),
        url(/img/dog.jpg)`,
        backgroundSize: 'cover',
      }}
    >
      <div className="flex justify-center basis-2/4"></div>
      <div className="flex flex-col items-center justify-center basis-2/5 ">
        <div className="flex flex-col items-center justify-center w-3/5 h-4/5">
          <p className="py-6 font-bold 2xl:text-3xl lg:text-1xl">
            찾고 싶은 식물을 보여주세요
          </p>
          <div className="h-56 py-2 w-96">
            <input
              type="file"
              id="fileUpload"
              style={{ display: 'none' }}
              multiple={true}
              onChange={onChangeFiles}
            />
            <label htmlFor="fileUpload" ref={dragRef}>
              <div
                className={
                  // (isDragging
                  `bg-gray-50 shadow-xl w-full h-full flex items-center justify-center text-center dropContainer  rounded-2xl hover:bg-gray-200 ${
                    isDragging ? `bg-slate-200` : 'bg-gray-50'
                  }
                  }`
                }
              >
                Drag & Drop <br />
                <br />
                파일 선택
              </div>
            </label>
          </div>
          <div className="flex items-center justify-center shadow-xl bg-gray-50 w-96 h-96 rounded-2xl">
            <div className="bg-gray-100 bg-center bg-no-repeat bg-cover w-80 h-80 dragContainer rounded-2xl"></div>
          </div>

          <span className="py-3 text-xs font-bold">
            파일명 : &nbsp;
            {files.length > 0 && (
              <span>
                <span>{files[0]?.name}</span>
                <span
                  className="cursor-pointer drags hover:text-rose-500"
                  onClick={() => handleFilterFile()}
                >
                  &nbsp; X
                </span>
              </span>
            )}
          </span>
          <button className="w-32 bg-white border-2 h-9 rounded-2xl border-lime-400 hover:bg-green-300 hover:border-green-300 focus:outline-none">
            이미지 등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadContainer;
