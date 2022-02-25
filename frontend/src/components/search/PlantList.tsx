import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  useSetRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from 'recoil';
import {
  fetchPlant,
  searchPlant,
  pageAtom,
  scrollPage,
} from '../../api/search';
import PlantCard from './PlantCard';
import { useNavigate } from 'react-router-dom';
import { throttle } from 'lodash';
import { api } from '../../api';

type Plant = {
  kor: string;
  name: string;
  rank: number;
  image_url: string;
};

const PlantList = () => {
  const navigate = useNavigate();

  // const plantsList = plantData.results;
  // const plantData = useRecoilValue(fetchPlant);
  const setPage = useSetRecoilState(pageAtom);
  const scrollResult = useRecoilValueLoadable(scrollPage);

  const [plantsList, setPlantsList] = useState<Plant[]>([]);

  const searchData = useRecoilValueLoadable(searchPlant);
  const searchResult = searchData.contents;

  const [target, setTarget] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const goDetail = useCallback((e: any) => {
    navigate(`/plant/${e.target.id}/info`);
  }, []);

  // setPlantsList(scrollResult.contents.results);

  // const getMoreItem = async () => {
  //   setIsLoaded(true);
  //   setPage(scrollResult?.contents.next);
  //   setPlantsList(plantsList =>
  //     plantsList.concat(scrollResult?.contents?.results),
  //   );
  //   setIsLoaded(false);
  // };

  // const onIntersect = async ([entry]: any, observer: any) => {
  //   if (entry.isIntersecting && !isLoaded) {
  //     observer.unobserve(entry.target);
  //     await getMoreItem();
  //     observer.observe(entry.target);
  //   }
  // };

  // useEffect(() => {
  //   let observer: any;
  //   if (target) {
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0.4,
  //     });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target]);

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
      <div ref={setTarget} className="Target-Element">
        {isLoaded && <h2>로딩중입니다.</h2>}
      </div>
    </div>
  );
};

export default React.memo(PlantList);
