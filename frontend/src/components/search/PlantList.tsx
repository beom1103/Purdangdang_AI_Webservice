import React, { useState, useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  fetchPlant,
  searchPlant,
  scrollPage,
  plantQueryAtom,
  plantListAtom,
} from '../../api/search';
import PlantCard from './PlantCard';
import { useNavigate } from 'react-router-dom';
import { Plant } from '../../store/type';

const PlantList = () => {
  const navigate = useNavigate();
  const plantQuery = useRecoilValue(plantQueryAtom);
  const fetchPlantList = useRecoilValue(fetchPlant);

  const [page, setPage] = useState(2);

  const [plantsList, setPlantsList] = useRecoilState<Plant[] | any>(
    plantListAtom,
  );

  const searchData = useRecoilValueLoadable(searchPlant);
  const searchResult = searchData.contents;

  useEffect(() => {
    setPlantsList(fetchPlantList.results);
  }, []);

  const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      console.log(page);
      await getMorePlant();
    }
  };

  const getMorePlant = useCallback(async () => {
    setPage(page + 1);
    const newPlant = await scrollPage(page);
    setPlantsList((prev: any) => [...prev, ...newPlant.results]);
  }, [page]);

  useEffect(() => {
    // scroll event listener 등록
    window.addEventListener('scroll', handleScroll);
    return () => {
      // scroll event listener 해제
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const goDetail = useCallback((e: any) => {
    navigate(`/plant/${e.target.id}/info`);
  }, []);
  return (
    <div className="card">
      {!plantQuery
        ? plantsList?.map((data: Plant): JSX.Element => {
            return (
              <PlantCard
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
