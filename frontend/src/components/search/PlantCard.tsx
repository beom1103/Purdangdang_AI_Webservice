import React from 'react';

type CardProps = {
  kor: string;
  name: string;
  image: string;
};

const PlantCard: React.FC<CardProps> = ({ kor, image, name }) => {
  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-md shadow-md">
      <div
        className="flex items-end justify-end w-full h-56 bg-cover"
        style={{
          backgroundImage: `url(${image})`,
          backgroundPositionY: '-50px',
        }}
      ></div>
      <div className="px-5 py-3">
        <h3 className="text-gray-700 uppercase">{kor}</h3>
        <span className="mt-2 text-gray-500">{name}</span>
      </div>
    </div>
  );
};

export default PlantCard;
