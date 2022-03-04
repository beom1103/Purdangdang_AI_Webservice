import React, { useCallback, ChangeEvent } from 'react';
import imageResize from '../homepage/ImageResize';
const pant_name: any = {
  1: `메인 댕댕`,
  2: `사슴 댕댕`,
  3: `모르는 댕댕`,
};

const UploadList = ({ id, checked, files, setFiles, setImgUrl }: any) => {
  const onClickFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];

      selectFiles = e.target?.files;

      imageResize({
        file: selectFiles[0],
        maxSize: 500,
      })
        .then(res => {
          setImgUrl(res);
        })
        .catch(function (err) {
          console.error(err);
        });
    },
    [],
  );

  const handleDelete = (number: any) => {
    //   파일 삭제 api 호출 예정
    const delList = files;
    delList.splice(number, 1);
    setFiles([...delList]);
  };

  return (
    <>
      {files[id - 2] !== undefined || id === 1 ? (
        <li className="mb-2">
          {files[id - 1] !== undefined ? (
            <div className="flex justify-between md:justify-between">
              <div>
                <span>{id}.이름 : </span>
                <span className={`${checked === id ? `text-green-500` : null}`}>
                  {pant_name[id]}
                </span>
              </div>
              <button
                className="bg-red-400 "
                onClick={() => handleDelete(id - 1)}
              >
                삭제
              </button>
            </div>
          ) : (
            <div className="flex justify-between md:justify-between">
              <span>{id}. 파일없음</span>
              <input
                type="file"
                id={id}
                style={{ display: 'none' }}
                multiple={true}
                accept="image/*"
                onChange={onClickFiles}
              />
              <label
                className="text-white bg-green-400 rounded-md"
                htmlFor={id}
              >
                파일 선택
              </label>
            </div>
          )}
        </li>
      ) : null}
    </>
  );
};

export default UploadList;
