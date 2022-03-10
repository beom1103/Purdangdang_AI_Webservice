import { Link, Outlet } from 'react-router-dom';
import tw from 'tailwind-styled-components';

const AccountPage = () => {
  return (
    <div style={{ outline: 'none' }} tabIndex={-1}>
      <div className="flex min-h-screen">
        <div className="account-wrap">
          <AcountDiv>
            <Link to="" aria-current="page" />
            <Link to="register" />
            <Outlet />
          </AcountDiv>
        </div>
        <AcountImgDiv>
          <AcountImg
            width="100%"
            height="100%"
            alt="Login Image"
            src="/img/login.jpg"
          />
        </AcountImgDiv>
      </div>
    </div>
  );
};

export default AccountPage;

const AcountDiv = tw.div`
  w-full 
  max-w-sm 
  mx-auto 
  lg:w-96
`;

const AcountImgDiv = tw.div`
  relative 
  flex-1 
  hidden 
  w-0 
  lg:block
`;

const AcountImg = tw.img`
  absolute 
  inset-0 
  object-cover 
  w-full 
  h-full
`;
