import React from 'react';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';
import SearchInput from '../components/search/SearchInput';
import FilterButton from '../components/search/FilterButton';
import PlantList from '../components/search/PlantList';
import { validLogin } from '../api';
import TopButton from '../components/global/TopButton';
import { fetchPlant } from '../api/search';

const SearchPage = () => {
  const userInfo = useRecoilValue(validLogin);
  useRecoilValue(fetchPlant);
  return (
    <SearchDiv>
      <header>
        <div className="wrap">
          <H2>
            푸르댕댕
            <Leaf />
          </H2>
        </div>
        <SearchInput />

        {/* {userInfo && <H3>{userInfo.username}님께 추천하는 식물!</H3>} */}
        <H3>이런 식물을 찾으시나요?</H3>
      </header>

      <main>
        <FilterButton />
        <PlantList />
      </main>
      <TopButton />
    </SearchDiv>
  );
};

export default React.memo(SearchPage);

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

const Leaf = tw.i` 
  fas
  fa-leaf
  ml-1
`;
