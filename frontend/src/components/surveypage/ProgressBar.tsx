import React from 'react';
import tw from 'tailwind-styled-components';

type BarProps = {
  checkList: string[];
};

const ProgressBar: React.FC<BarProps> = ({ checkList }) => {
  const percent = Math.ceil((checkList.length / 6) * 100);
  return (
    <div className="relative pt-1">
      <div className="justify-between mb-2 center">
        <div>
          <Badge>진행도</Badge>
        </div>
        <div className="text-right">
          <Percent>{percent}%</Percent>
        </div>
      </div>
      <Bar>
        <HighLight style={{ width: `${percent}%` }} />
      </Bar>
    </div>
  );
};

export default ProgressBar;

const Bar = tw.div`
  flex 
  h-2
  mb-4 
  overflow-hidden 
  text-xs 
  rounded 
  bg-emerald-200
  `;

const HighLight = tw.div`
  flex
  flex-col
  justify-center
  text-center 
  text-white
  shadow-none 
  whitespace-nowrap
  bg-emerald-500
  transition-all 
  ease-out 
  duration-1000
  `;

const Badge = tw.div`
  inline-block 
  px-2 
  py-1 
  text-xs 
  font-semibold
  uppercase 
  rounded-full 
  text-emerald-600 bg-emerald-200
  `;

const Percent = tw.span`
  inline-block
  text-xs 
  font-semibold 
  text-emerald-600
`;
