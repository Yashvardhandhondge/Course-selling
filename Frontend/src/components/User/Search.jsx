import React from 'react';

const Search = React.memo(({ onSearch }) => {
    const handleChange = (event) => {
        onSearch(event.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search courses..."
            className="border rounded bg-purple-700 placeholder-white font-bold font-poppins text-white p-2 w-96"
            onChange={handleChange}
        />
    );
});

export default Search;
