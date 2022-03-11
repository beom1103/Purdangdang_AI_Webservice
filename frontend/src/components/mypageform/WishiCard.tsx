import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { Plant } from '../../store/type';

type wishProps = {
  key: string;
  wishi: Plant;
};

const WishiCard = ({ wishi }: wishProps) => {
  const id = wishi.id;
  const image = wishi.image_url;
  const kor = wishi.kor;
  const name = wishi.name;

  return (
    <Li className="myPage_Card">
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
    </Li>
  );
};

export default WishiCard;

const Li = tw.li`
  inline-block
  w-48
  mx-3
  my-4
`;
