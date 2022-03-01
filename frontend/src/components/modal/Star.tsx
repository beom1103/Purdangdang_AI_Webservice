import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';
import { reviewPostAtom } from '../../api/search';

const Star = () => {
  const defaultState: string[] = [];
  const [reviewState, setReviewState] = useRecoilState(reviewPostAtom);

  const [starState, setStarState] = useState<string[]>(defaultState);

  const starAraay = [1, 2, 3, 4, 5];

  const fillStar = useCallback(
    (e: any) => {
      const { id } = e.target;
      const newStarState: string[] = [];
      starAraay.forEach(i => {
        if (i <= id) {
          newStarState.push('text-yellow-500');
        } else {
          newStarState.push('text-gray-500');
        }
      });
      setReviewState({ ...reviewState, ['score']: id });
      setStarState(newStarState);
    },
    [reviewState],
  );

  useEffect(() => {
    starAraay.forEach(i => defaultState.push('text-gray-500'));
  });

  return (
    <div>
      {starAraay.map((star: number) => {
        return (
          <RatingStar
            key={star}
            id={`${star}`}
            className={starState[star - 1]}
            onClick={fillStar}
          />
        );
      })}
    </div>
  );
};

export default Star;

const RatingStar = tw.i`
  fas
  fa-star
  mr-5
  text-3xl
  cursor-pointer
`;
