import React from 'react';
import SearchInput from '../components/search/SearchInput';
import PlantCard from '../components/search/PlantCard';
import FIlterButton from '../components/search/FIlterButton';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { userAtom } from '../store/user';
import tw from 'tailwind-styled-components';
import { fetchPlant, searchPlant } from '../api/search';

type Plant = {
  kor: string;
  name: string;
  rank: number;
  image_url: string;
};

const SearchPage = () => {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userAtom);
  const plantData = useRecoilValue(fetchPlant);
  const searchResult = useRecoilValueLoadable(searchPlant);

  const plantsList = plantData.results;

  const goDetail = (e: any) => {
    navigate(`/plant/${e.target.id}/info`);
  };

  console.log(searchResult);
  return (
    <SearchDiv>
      <header>
        <div className="wrap">
          <H2>푸르댕댕</H2>
        </div>
        <SearchInput />

        {userInfo && <H3>{userInfo.email}님께 추천하는 식물!</H3>}
        <H3>이런 식물을 찾으시나요?</H3>
        <FIlterButton />
      </header>

      <main>
        <div className="card">
          {plantsList &&
            plantsList.map((data: Plant): JSX.Element => {
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
      </main>
    </SearchDiv>
  );
};

export default SearchPage;

const SearchDiv = tw.div`
  container 
  px-6 
  pt-16 
  mx-auto
`;

const H2 = tw.h2`
  font-semibold 
  text-green-600
`;

const H3 = tw.h3`
  mt-6 
  text-black 
  md:text-xl
`;
