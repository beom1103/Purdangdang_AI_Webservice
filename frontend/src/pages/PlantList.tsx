import React from 'react';
import fakes from '../store/fake.json';

type Fake = {
  kor: string;
  name: string;
  rank: number;
  image: string;
};

const PlantList = () => {
  const ffakes: Fake[] = fakes;
  return (
    <div>
      {ffakes.map((image): JSX.Element => {
        return (
          <div>
            <img src={`${image.image}`} alt="" />
          </div>
        );
      })}
    </div>
  );
};

export default PlantList;
