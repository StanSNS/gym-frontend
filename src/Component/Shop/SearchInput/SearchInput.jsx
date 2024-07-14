import React, {useEffect, useRef} from 'react';
import { FaTimesCircle } from "react-icons/fa";
import "./SearchInput.css";

const SearchInput = ({ searchQuery, handleSearchChange, clearSearch, placeHolder, myWidth, customClass, buttonCustomClass }) => {
    const inputRef = useRef(null);
    const inputClass = `searchInput ${customClass || ''}`;

    const scrollToRow = () => {
        const rowElement = document.querySelector('.row');
        if (rowElement) {
            rowElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            scrollToRow();
            inputRef.current.blur();
        }
    };

    const handleSearchClick = () => {
        scrollToRow();
        inputRef.current.blur();
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div className="searchInputContainer">
            <input
                ref={inputRef}
                maxLength={20}
                type="text"
                style={{width: myWidth}}
                className={inputClass}
                placeholder={placeHolder}
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
            />

            {searchQuery && (
                <button className="inputClearButton" onClick={() => {
                    clearSearch();
                    handleSearchClick();
                }}>
                    <FaTimesCircle className={`deleteSearchIcon ${buttonCustomClass || ''}`}/>
                </button>
            )}
        </div>
    );
};

export default SearchInput;
