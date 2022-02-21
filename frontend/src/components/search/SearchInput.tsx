import React from 'react';

const SearchInput = () => {
  return (
    <div>
      <div className="relative max-w-lg mx-auto mt-6">
        <span className="absolute inset-y-0 left-0 pl-3 wrap">
          <i className="fas fa-search" />
        </span>

        <input
          className="search-input focus:outline-none"
          type="text"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchInput;
