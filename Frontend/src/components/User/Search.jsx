import React from 'react';

const Search = ({ onSearch }) => {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search courses..."
            className="border rounded p-2 w-full"
            onChange={handleChange}
        />
    );
};

export default Search;
