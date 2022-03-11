import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import description from '../../store/description.json';

const ServiceDescript = () => {
  return (
    <DescriptContainer>
      <div className="container px-5 mx-auto">
        <H1>서비스 소개</H1>
        <DescriptBox>
          {description.map(des => {
            return (
              <div className="flex p-4 cursor-default md:w-1/3 ">
                <Icon>
                  <i className={des.className} />
                </Icon>
                <div className="flex-grow pl-6">
                  <Title>{des.title}</Title>
                  <Descript>{des.descript}</Descript>
                  <Link to={des.to}>
                    <Button>GO~</Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </DescriptBox>
      </div>
    </DescriptContainer>
  );
};

export default ServiceDescript;

const DescriptContainer = tw.div`
  text-gray-600 
  mt-52 
  sm:mt-72 
  body-font
`;

const H1 = tw.h1`
  mb-10 
  text-2xl 
  font-medium 
  text-center 
  text-gray-900 
  sm:text-3xl 
  title-font
`;

const Button = tw.button` 
  px-3 
  my-3 
  text-black 
  bg-gray-200 
  rounded-lg 
  sm:mb-0 
  xs:w-auto 
  hover:bg-green-500
`;

const DescriptBox = tw.button` 
  flex 
  flex-wrap 
  -mx-4 
  -mt-4 
  -mb-10 
  space-y-6 
  sm:-m-4 
  md:space-y-0"
`;

const Descript = tw.p` 
  text-base 
  leading-relaxed
  flex-wrap 
  text-black
`;

const Icon = tw.div` 
  inline-flex 
  items-center 
  justify-center 
  flex-shrink-0 
  w-12 
  h-12 
  mb-4 
  text-green-500 
  bg-green-100 
  rounded-full
`;

const Title = tw.h2` 
  mb-2 
  text-lg 
  font-medium 
  text-gray-900 
  title-font
`;
