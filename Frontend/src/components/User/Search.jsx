import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = React.memo(({ onSearch }) => {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <div className="flex h-8 mt-4 sm:mt-4 lg:mt-0 sm:h-8 lg:h-12 items-center border rounded bg-purple-700 p-1 max-w-md w-full">
            <FaSearch className="text-white mr-2" />
            <input
                type="text"
                placeholder="Search courses..."
                className="bg-purple-700 placeholder-white font-bold font-poppins text-white focus:outline-none w-full max-w-xs py-1 text-sm"
            />
        </div>
    );
});

export default Search;
