import React, { useCallback } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { fetchPlant, searchPlant } from '../../api/search';
import PlantCard from './PlantCard';
import { useNavigate } from 'react-router-dom';

type Plant = {
  kor: string;
  name: string;
  rank: number;
  image_url: string;
};

const PlantList = () => {
  const navigate = useNavigate();

  const plantData = useRecoilValue(fetchPlant);
  const plantsList = plantData.results;
  const searchData = useRecoilValueLoadable(searchPlant);
  const searchResult = searchData.contents;

  const goDetail = useCallback((e: any) => {
    navigate(`/plant/${e.target.id}/info`);
  }, []);
  return (
    <div className="card">
      {searchResult.count < 1
        ? plantsList?.map((data: Plant): JSX.Element => {
            return (
              <PlantCard
                key={data.rank}
                kor={data.kor}
                name={data.name}
                rank={data.rank - 1}
                image={data.image_url}
                onClick={goDetail}
              />
            );
          })
        : searchResult?.results?.map((data: Plant): JSX.Element => {
            return (
              <PlantCard
                key={data.rank}
                kor={data.kor}
                name={data.name}
                rank={data.rank - 1}
                image={data.image_url}
                onClick={goDetail}
              />
            );
          })}
    </div>
  );
};

export default React.memo(PlantList);
