import tw from 'tailwind-styled-components';
import Footer from '../components/global/Footer';
import ServiceCaution from '../components/service/ServiceCaution';
import ServiceDescript from '../components/service/ServiceDescript';
import ServiceIntro from '../components/service/ServiceIntro';

const ServicePage = () => {
  const img =
    'https://images.unsplash.com/photo-1533029026076-7160c0f3187b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80';

  return (
    <div className="-z-10">
      <Img src={img} alt="service-background-image" />
      <Container>
        <Box>
          <Content>
            <ServiceIntro />
            <ServiceDescript />
            <ServiceCaution />
          </Content>
          <Footer />
        </Box>
      </Container>
    </div>
  );
};

export default ServicePage;

const Img = tw.img` 
  absolute 
  top-0
  left-0
  block 
  object-cover
  w-full 
  h-4/5
`;

const Container = tw.div` 
  relative 
  flex 
  items-center
  flex-grow 
  px-5 
  sm:px-12 
  lg:px-24
`;

const Box = tw.div` 
  w-full 
  max-w-screen-xl 
  mx-auto
`;

const Content = tw.div` 
  relative 
  pt-67 
  pb-38 
  md:pt-40 
  2xl:pt-46 
  2xl:ml-28.5
`;
