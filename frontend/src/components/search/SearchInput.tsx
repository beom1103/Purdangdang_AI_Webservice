import React from 'react';
import tw from 'tailwind-styled-components';

const SearchInput = () => {
  return (
    <Div className="">
      <span className="absolute inset-y-0 left-0 pl-3 wrap">
        <i className="fas fa-search" />
      </span>

      <input
        className="search-input focus:outline-none"
        type="text"
        placeholder="Search"
      />
    </Div>
  );
};

export default SearchInput;

const Div = tw.div`
  relative max-w-lg mx-auto mt-6
`;
