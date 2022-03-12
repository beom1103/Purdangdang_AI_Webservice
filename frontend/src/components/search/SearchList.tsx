import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { searchPlant } from '../../api/search';
import { Plant } from '../../store/type';
import PlantCard from './PlantCard';

const SearchList = () => {
  const searchData = useRecoilValueLoadable(searchPlant);
  const searchResult = searchData.contents;

  const navigate = useNavigate();

  //상세 페이지로 라우팅
  const goDetail = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const plantId = target.id;

    navigate(`/plant/${plantId}/info`);
  }, []);
  return (
    <>
      {searchResult?.results?.map((data: Plant, idx: number): JSX.Element => {
        return (
          <PlantCard
            key={`plant-${idx}`}
            kor={data.kor}
            name={data.name}
            rank={data.rank}
            image={data.image_url}
            onClickFunc={goDetail}
          />
        );
      })}
      {searchResult.count === 0 && <h3>검색결과가 없습니다.</h3>}
    </>
  );
};

export default SearchList;
