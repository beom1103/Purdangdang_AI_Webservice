import React, {
  useState,
  useCallback,
  useEffect,
  MouseEventHandler,
} from 'react';
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

  const searchData = useRecoilValueLoadable(searchPlant);
  const searchResult = searchData.contents;

  const [plantsList, setPlantsList] = useRecoilState<Plant[] | any>(
    plantListAtom,
  );
  const [page, setPage] = useState(2);

  useEffect(() => {
    setPlantsList(fetchPlantList.results);
  }, []);

  // 스크롤이 맨 밑에 있을때 실행
  const handleScroll = useCallback(async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollHeight - scrollTop === clientHeight) {
      await getMorePlant();
    }
  }, [page]);

  //추가 데이터 불러오기
  const getMorePlant = useCallback(async () => {
    setPage(page + 1);

    const newPlant = await scrollPage(page);
    setPlantsList((prev: Plant[]) => [...prev, ...newPlant.results]);
  }, [page]);

  //이벤트 제어
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  //상세 페이지로 라우팅
  const goDetail = useCallback((e: MouseEventHandler | any) => {
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
