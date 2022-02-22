import React from 'react';

const SearchInput = () => {
  return (
    <div>
      <div className="relative max-w-lg mx-auto mt-6">
        <span className="absolute inset-y-0 left-0 pl-3 wrap">
          <svg
            className="w-5 h-5 text-gray-500"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
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
