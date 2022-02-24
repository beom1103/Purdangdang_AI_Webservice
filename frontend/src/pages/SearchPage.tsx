import React from 'react';
import { userAtom } from '../store/user';
import { useRecoilValue } from 'recoil';
import tw from 'tailwind-styled-components';
import SearchInput from '../components/search/SearchInput';
import FIlterButton from '../components/search/FIlterButton';
import PlantList from '../components/search/PlantList';

const SearchPage = () => {
  const userInfo = useRecoilValue(userAtom);

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
        <PlantList />
        <div className="card"></div>
      </main>
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
