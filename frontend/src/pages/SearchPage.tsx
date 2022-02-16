import React from 'react';
import SearchInput from '../components/search/SearchInput';
import PlantCard from '../components/search/PlantCard';
import fake from '../store/fake.json';

type Fake = {
  kor: string;
  name: string;
  rank?: number;
  image: string;
};

const SearchPage = () => {
  return (
    <div className="flex items-center justify-center overflow-hidden">
      {/* <SearchInput /> */}

      <div className="my-8">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fake.map((data: Fake): JSX.Element => {
              return (
                <PlantCard
                  key={data.rank}
                  kor={data.kor}
                  name={data.name}
                  image={data.image}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
