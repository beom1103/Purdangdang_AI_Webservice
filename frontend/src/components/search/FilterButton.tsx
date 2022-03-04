import React, { useCallback } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import tw from "tailwind-styled-components";
import { filterAtom, plantListAtom } from "../../api/search";

const FilterButton = () => {
  const [filter, setFilter] = useRecoilState(filterAtom);
  const reset = useResetRecoilState(plantListAtom);

  const changeFilter = useCallback(
    (e: React.MouseEvent<any>): void => {
      const { textContent } = e.currentTarget;
      if (filter !== textContent) {
        reset();
      }
      setFilter(textContent);
    },
    [filter]
  );

  return (
    <div className="mt-5">
      <div className="flex rounded-xl">
        <div>
          <Input type="radio" name="option" id="1" hidden defaultChecked />
          <Label htmlFor="1" onClick={changeFilter}>
            전체
          </Label>
        </div>

        <div>
          <Input type="radio" name="option" id="2" hidden />
          <Label htmlFor="2" onClick={changeFilter}>
            꽃이 피는
          </Label>
        </div>

        <div>
          <Input type="radio" name="option" id="3" hidden />
          <Label htmlFor="3" onClick={changeFilter}>
            공기정화
          </Label>
        </div>

        <div>
          <Input type="radio" name="option" id="4" hidden />
          <Label htmlFor="4" onClick={changeFilter}>
            반려동물 안전한
          </Label>
        </div>
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
