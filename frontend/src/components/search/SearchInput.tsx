import React, { useMemo, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import tw from 'tailwind-styled-components';
import { plantQueryAtom } from '../../api/search';
import { debounce } from 'lodash';

const SearchInput = () => {
  const [query, setQuery] = useRecoilState(plantQueryAtom);

  const searchPlant = useCallback(
    e => {
      setQuery(e.target.value);
    },
    [setQuery],
  );

  const debouncedResults = useMemo(() => {
    return debounce(searchPlant, 300);
  }, [query]);

  return (
    <Div>
      <span className="absolute inset-y-0 left-0 pl-3 wrap">
        <i className="fas fa-search" />
      </span>

      <input
        className="search-input focus:outline-none"
        type="text"
        placeholder="Search"
        onChange={debouncedResults}
        defaultValue={query}
      />
    </Div>
  );
};

export default SearchInput;

const Div = tw.div`
  relative max-w-lg mx-auto mt-6
`;
