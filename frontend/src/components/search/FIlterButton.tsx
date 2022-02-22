import React from 'react';
import tw from 'tailwind-styled-components';

// 그냥 예시 버튼 나중에 다 지우고 다시 구현해야 함.

const FIlterButton = () => {
  return (
    <div className="mt-5">
      <div className="flex rounded-xl">
        <div>
          <Input type="radio" name="option" id="1" hidden defaultChecked />
          <Label htmlFor="1">전체</Label>
        </div>

        <div>
          <Input type="radio" name="option" id="2" hidden />
          <Label htmlFor="2">꽃이 피는</Label>
        </div>

        <div>
          <Input type="radio" name="option" id="3" hidden />
          <Label htmlFor="3">공기정화</Label>
        </div>

        <div>
          <Input type="radio" name="option" id="4" hidden />
          <Label htmlFor="4">반려동물 무해</Label>
        </div>
      </div>
    </div>
  );
};

export default FIlterButton;

const Input = tw.input`
  peer
`;

const Label = tw.label`
  radio
`;
