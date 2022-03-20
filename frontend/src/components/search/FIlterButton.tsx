import React, { useCallback } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';
import { filterAtom, plantListAtom } from '../../api/search';

const FilterButton = () => {
  const [filter, setFilter] = useRecoilState(filterAtom);
  const reset = useResetRecoilState(plantListAtom);

  const changeFilter = useCallback(
    (e): void => {
      const { textContent } = e.currentTarget;
      if (filter !== textContent) {
        reset();
      }
      setFilter(textContent);
    },
    [filter],
  );

  const filterList = ['전체', '꽃이 피는', '공기정화', '반려동물 안전한'];

  return (
    <div className="mt-5">
      <div className="flex rounded-xl">
        {filterList.map((fil, idx) => {
          return (
            <div key={`fil${idx}`}>
              <Input
                type="radio"
                name="option"
                id={`${idx}`}
                hidden
                readOnly
                checked={filter === fil}
              />
              <Label htmlFor={`${idx}`} onClick={changeFilter}>
                {fil}
              </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterButton;

const Input = tw.input`
  peer
`;

const Label = tw.label`
  radio
`;
