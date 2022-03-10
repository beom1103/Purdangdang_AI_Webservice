import { throttle } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

const useScrollToggle = (initState = false) => {
  const [scrollFlag, setScrollFlag] = useState(initState);

  const upateScroll = useCallback(() => {
    const { scrollY } = window;
    const flagHeight = 500;
    scrollY > flagHeight ? setScrollFlag(true) : setScrollFlag(false);
  }, [scrollFlag]);

  const handleScroll = throttle(upateScroll, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return scrollFlag;
};

export default useScrollToggle;
