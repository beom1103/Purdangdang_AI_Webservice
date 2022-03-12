import React from 'react';

type CardProps = {
  kor: string;
  name: string;
  image: string;
  rank: number;
  onClickFunc: React.MouseEventHandler<HTMLDivElement>;
};

const PlantCard: React.FC<CardProps> = ({
  kor,
  image,
  name,
  rank,
  onClickFunc,
}) => {
  return (
    <div className="card-div animate-fade-in-up">
      <div>
        <div
          id={`${rank}`}
          className="card-img"
          style={{
            backgroundImage: `url(${image})`,
            backgroundPositionY: '-40px',
          }}
          onClick={onClickFunc}
        ></div>
        <div id={`${rank}`} className="px-5 py-3" onClick={onClickFunc}>
          <h3>{kor}</h3>
          <span className="mt-2 text-gray-500">{name}</span>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
