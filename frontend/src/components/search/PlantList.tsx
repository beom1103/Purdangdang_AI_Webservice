import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  scrollPage,
  plantQueryAtom,
  plantListAtom,
  filterAtom,
  searchPlant,
} from '../../api/search';
import PlantCard from './PlantCard';
import { useNavigate } from 'react-router-dom';
import { Plant } from '../../store/type';
import SearchList from './SearchList';
import { throttle } from 'lodash';
import { url } from 'inspector';

const TIME = 500;

const PlantList = () => {
  const navigate = useNavigate();
  const plantQuery = useRecoilValue(plantQueryAtom);
  const fetchPlantList = useRecoilValueLoadable(searchPlant);
  const [plantsList, setPlantsList] = useRecoilState(plantListAtom);
  const filter = useRecoilValue(filterAtom);
  const [page, setPage] = useState(1);
  const [isNext, setIsNext] = useState(false);

  const requestFetchPlant = useCallback((): void => {
    if (fetchPlantList === null || fetchPlantList === undefined) {
      return;
    }

    switch (fetchPlantList.state) {
      case 'loading':
        break;

      case 'hasValue':
        const { results } = fetchPlantList.contents;
        setPlantsList(results);
        break;

      case 'hasError':
        break;

      default:
        return;
    }
  }, [fetchPlantList]);

  // 스크롤이 맨 밑에 있을때 실행
  const handleScroll = useCallback(
    throttle(async () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight } = document.documentElement;
      if (isNext && innerHeight + scrollY >= scrollHeight) {
        const pageUp = page + 1;
        setPage(pageUp);
        await getMorePlant(pageUp, filter);
      }
    }, TIME),
    [fetchPlantList, page],
  );

  //추가 데이터 불러오기
  const getMorePlant = useCallback(
    async (page: number, filter: string) => {
      const newPlant = await scrollPage(page, filter);
      stopScroll(newPlant.next);
      setPlantsList((prev: Plant[]) => [...prev, ...newPlant.results]);
    },
    [fetchPlantList],
  );

  const stopScroll = (url: string) => {
    if (url === null) {
      setIsNext(false);
    }
  };

  //상세 페이지로 라우팅
  const goDetailPage = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const plantId = target.id;

    if (plantId) {
      navigate(`/plant/${plantId}/info`);
    }
  }, []);

  //이벤트 제어
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('touchend', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchend', handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    requestFetchPlant();
    setPage(1);
    setIsNext(true);
  }, [filter]);

  useEffect(() => {
    requestFetchPlant();
  }, [requestFetchPlant]);

  return (
    <div className="card">
      {fetchPlantList?.state === 'hasValue' && !plantQuery ? (
        plantsList?.map((data: Plant, index: number): JSX.Element => {
          return (
            <PlantCard
              key={`plant-${index}`}
              kor={data.kor}
              name={data.name}
              rank={data.rank}
              image={data.image_url}
              onClickFunc={goDetailPage}
            />
          );
        })
      ) : (
        <SearchList />
      )}
    </div>
  );
};

export default React.memo(PlantList);
