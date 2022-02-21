import React from 'react';

// 그냥 예시 버튼 나중에 다 지우고 다시 구현해야 함.

const FIlterButton = () => {
  return (
    <div className="mt-5">
      <div className="flex rounded-xl">
        <div>
          <input
            type="radio"
            name="option"
            id="1"
            className="peer"
            hidden
            defaultChecked
          />
          <label htmlFor="1" className="radio">
            전체
          </label>
        </div>

        <div>
          <input type="radio" name="option" id="2" className="peer" hidden />
          <label htmlFor="2" className="radio">
            꽃이 피는
          </label>
        </div>

        <div>
          <input type="radio" name="option" id="3" className="peer" hidden />
          <label htmlFor="3" className="radio">
            공기정화
          </label>
        </div>

        <div>
          <input type="radio" name="option" id="4" className="peer" hidden />
          <label htmlFor="4" className="radio">
            반려동물 무해
          </label>
        </div>
      </div>
    </div>
  );
};

export default FIlterButton;
