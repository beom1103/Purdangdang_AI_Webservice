import React, { useState, useRef, useEffect } from 'react';
import tw from 'tailwind-styled-components';

type MyImageProps = {
  files: string[];
  id: number;
  checked: number;
  setChecked: any;
  setMainImg: any;
};

const MyImageUpload = ({
  files,
  id,
  checked,
  setChecked,
  setMainImg,
}: MyImageProps) => {
  const imgRef: any = useRef([]);
  let main;

  const checkHandler = (num: any) => {
    main = imgRef.current[num].src;
    setMainImg(main);
    setChecked(num + 1);
  };

  useEffect(() => {
    if (files[id] !== undefined) {
      const imgEl1 = imgRef.current[id];
      imgEl1.src = files[id];
    } else {
      const imgEl1 = imgRef.current[id];
      imgEl1.src = `./img/tree.png`;
      setMainImg(files[0]);
    }
  }, [files]);
  return (
    <>
      <li className="relative" onClick={() => checkHandler(id)}>
        <img
          className="object-fill w-64 rounded-lg h-1/5 md:h-24"
          alt="나만의 식물"
          ref={elem => (imgRef.current[id] = elem)}
        />
        <Div
          className={` ${checked === id + 1 ? `visible` : `invisible`}`}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
        >
          {id + 1}
        </Div>
      </li>
    </>
  );
};

export default MyImageUpload;

const Div = tw.div`
  absolute
  top-0
  w-full
  h-full
  flex
  items-center
  justify-center
  text-white
  rounded-lg
  m-0
`;
