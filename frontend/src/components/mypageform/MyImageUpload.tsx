import React from 'react';
import tw from 'tailwind-styled-components';

type MyImageProps = {
  files: string[];
  idx: number;
  checkedIdx: number;
  setChecked: React.Dispatch<React.SetStateAction<number>>;
};

const MyImageUpload = ({
  files,
  idx,
  checkedIdx,
  setChecked,
}: MyImageProps) => {
  const checkHandler = React.useCallback(num => {
    setChecked(num + 1);
  }, []);

  const checked = React.useMemo(() => {
    if (idx + 1 === checkedIdx) {
      return true;
    }
    return false;
  }, [idx, checkedIdx]);

  return (
    <li className="relative" onClick={() => checkHandler(idx)}>
      {files.length > 0 && <Image alt="나만의 식물" src={files[idx]} />}
      <Div
        className={` ${checked ? `visible` : `invisible`}`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      >
        {idx + 1}
      </Div>
    </li>
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

const Image = tw.img`
  object-fill
  w-64
  rounded-lg
  h-16
  sm:h-28
  md:h-24
`;
