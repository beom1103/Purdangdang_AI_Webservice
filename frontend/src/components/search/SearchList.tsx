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
  const goDetail = useCallback((e: React.MouseEventHandler | any) => {
    navigate(`/plant/${e.target.id}/info`);
  }, []);
  return (
    <>
      {searchResult?.results?.map((data: Plant): JSX.Element => {
        return (
          <PlantCard
            kor={data.kor}
            name={data.name}
            rank={data.rank}
            image={data.image_url}
            onClick={goDetail}
          />
        );
      })}
      ;
    </>
  );
};

export default SearchList;
