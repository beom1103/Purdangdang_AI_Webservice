import React from 'react';
import { Link } from 'react-router-dom';

const WishiCard = ({ key, wishi }: any) => {
  const id = wishi.id;
  const image = wishi.image_url;
  const kor = wishi.kor;
  const name = wishi.name;

  return (
    <li className="inline-block w-48 mx-3 my-4 mypage_Card ">
      <Link to={`/plant/${id}/info`}>
        <div
          className="card-img"
          style={{
            backgroundImage: `url(${image})`,
          }}
        ></div>
        <div className="px-5 py-3">
          <h3>{kor}</h3>
          <span className="mt-2 text-gray-500">{name}</span>
        </div>
      </Link>
    </li>
  );
};

export default WishiCard;
