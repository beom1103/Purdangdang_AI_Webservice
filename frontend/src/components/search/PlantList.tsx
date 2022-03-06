import React, {
  useCallback,
  useEffect,
  MouseEventHandler,
  useState,
} from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import {
  fetchPlant,
  scrollPage,
  plantQueryAtom,
  plantListAtom,
  filterAtom,
} from '../../api/search';
import PlantCard from './PlantCard';
import { useNavigate } from 'react-router-dom';
import { Plant } from '../../store/type';
import SearchList from './SearchList';

const PlantList = () => {
  const navigate = useNavigate();
  const plantQuery = useRecoilValue(plantQueryAtom);
  const fetchPlantList = useRecoilValueLoadable(fetchPlant);
  const [plantsList, setPlantsList] = useRecoilState<Plant[] | any>(
    plantListAtom,
  );
  const filter = useRecoilValue(filterAtom);
  const [page, setPage] = useState<number>(1);

  const requestFetchPlant = useCallback((): void => {
    if (fetchPlantList === null || fetchPlantList === undefined) {
      return;
    }

    switch (fetchPlantList.state) {
      case 'loading':
        break;

      case 'hasValue':
        setPlantsList(fetchPlantList.contents.results);
        break;

      case 'hasError':
        break;

      default:
        return;
    }
  }, [fetchPlantList]);

  // 스크롤이 맨 밑에 있을때 실행
  const handleScroll = useCallback(async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      const pageUp = page + 1;
      setPage(pageUp);
      await getMorePlant(pageUp, filter);
    }
  }, [fetchPlantList, page]);

  //추가 데이터 불러오기
  const getMorePlant = useCallback(
    async (page: number, filter: string) => {
      const newPlant = await scrollPage(page, filter);
      setPlantsList((prev: Plant[]) => [...prev, ...newPlant.results]);
    },
    [fetchPlantList],
  );

  //상세 페이지로 라우팅
  const goDetail = useCallback((e: MouseEventHandler | any) => {
    const plantId = e.target.id;
    if (plantId) {
      navigate(`/plant/${plantId}/info`);
    }
  }, []);

  //이벤트 제어
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    requestFetchPlant();
    setPage(1);
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
              onClick={goDetail}
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
