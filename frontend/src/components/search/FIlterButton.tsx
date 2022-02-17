import React from 'react';

// 그냥 예시 버튼 나중에 다 지우고 다시 구현해야 함.

const FIlterButton = () => {
  return (
    <div className="mt-5">
      <div className="flex rounded-xl">
        <div>
          <input type="radio" name="option" id="1" className="peer" hidden />
          <label htmlFor="1" className="radio">
            공기정화
          </label>
        </div>

        <div>
          <input type="radio" name="option" id="2" className="peer" hidden />
          <label htmlFor="2" className="radio">
            반려동물
          </label>
        </div>

        <div>
          <input type="radio" name="option" id="3" className="peer" hidden />
          <label htmlFor="3" className="radio">
            집이 건조
          </label>
        </div>

        <div>
          <input type="radio" name="option" id="4" className="peer" hidden />
          <label htmlFor="4" className="radio">
            집이 습한
          </label>
        </div>
      </div>
    </div>
  );
};

export default FIlterButton;
