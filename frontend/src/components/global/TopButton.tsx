import useScrollToggle from './useScrollToggle';
import tw from 'tailwind-styled-components';
const TopButton = () => {
  const scrollFlag = useScrollToggle(false);
  const moveToTop = () => (document.documentElement.scrollTop = 0);

  return scrollFlag ? <Top onClick={moveToTop}> Top</Top> : null;
};

export default TopButton;

const Top = tw.i` 
  fas
  fa-leaf
  fixed 
  z-10 
  p-3 
  bg-gray-100 
  text-green-600
  rounded-full 
  shadow-md 
  bottom-10 
  right-10 
  animate-bounce
  cursor-pointer
`;
