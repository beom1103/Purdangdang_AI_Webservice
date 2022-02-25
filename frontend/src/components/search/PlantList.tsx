import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
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
  const plantData = useRecoilValue(fetchPlant);
  const [page, setPage] = useState(plantData.next);
  const [plantsList, setPlantsList] = useState<Plant[]>(plantData.results);
  const [fetching, setFetching] = useState(false);

  const searchData = useRecoilValueLoadable(searchPlant);
  const searchResult = searchData.contents;
  const scrollResult = useRecoilValueLoadable(scrollPage);

  const goDetail = useCallback((e: any) => {
    navigate(`/plant/${e.target.id}/info`);
  }, []);

  // const fetchMoreInstaFeeds = async () => {
  //   setFetching(true);
  //   setPage(plantData.next);
  //   try {
  //     const { data } = await api.get(page);
  //     const mergedData = plantsList.concat(...data.results);
  //     setPlantsList(mergedData);
  //     console.log(plantsList);
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   // 추가 데이터 로드 끝
  //   setFetching(false);
  // };

  // // 스크롤 이벤트 핸들러
  // const handleScroll = () => {
  //   const { scrollHeight, scrollTop, clientHeight } = document.documentElement;

  //   if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
  //     fetchMoreInstaFeeds();
  //   }
  // };

  // useEffect(() => {
  //   fetchMoreInstaFeeds();
  // }, [plantsList]);

  // useEffect(() => {
  //   // scroll event listener 등록
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     // scroll event listener 해제
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // });

  return (
    <div className="card">
      {searchResult.count < 1
        ? plantsList.map((data: Plant): JSX.Element => {
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
