import React, {
  useCallback,
  useEffect,
  MouseEventHandler,
  useState,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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
  const fetchPlantList = useRecoilValue(fetchPlant);
  const [plantsList, setPlantsList] = useRecoilState<Plant[] | any>(
    plantListAtom,
  );
  const filter = useRecoilValue(filterAtom);
  const [page, setPage] = useState<number>(1);

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
    navigate(`/plant/${e.target.id}/info`);
  }, []);

  //이벤트 제어
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  useEffect(() => {
    setPlantsList(fetchPlantList.results);
    setPage(1);
  }, [filter]);

  return (
    <div className="card">
      {!plantQuery ? (
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
