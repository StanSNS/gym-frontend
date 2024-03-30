import React from 'react';
import {FaTimesCircle} from "react-icons/fa";
import "./SearchInput.css"

const SearchInput = ({searchQuery, handleSearchChange, clearSearch}) => {
    return (
        <div className="searchInputContainer">
            <input
                maxLength={20}
                type="text"
                className="searchInput"
                placeholder="Search for product..."
                value={searchQuery}
                onChange={handleSearchChange}
            />

            {searchQuery && (
                <button className="inputClearButton" onClick={clearSearch}>
                    <FaTimesCircle className="deleteSearchIcon"/>
                </button>
            )}
        </div>
    );
};

export default SearchInput;
