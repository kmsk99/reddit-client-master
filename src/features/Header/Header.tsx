import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaReddit } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm, selectSearchTerm } from '../../store/redditSlice';

const Header = () => {
    const [searchTermLocal, setSearchTermLocal] = useState('');
    const searchTerm = useSelector(selectSearchTerm);
    const dispatch = useDispatch();

    const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTermLocal(e.target.value);
    };

    useEffect(() => {
        setSearchTermLocal(searchTerm);
    }, [searchTerm]);

    const onSearchTermSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        dispatch(setSearchTerm(searchTermLocal));
    };

    return (
        <header className="h-16 px-16 text-indigo-600 bg-white shadow-lg">
            <div className="flex items-center col-span-1 col-start-1 py-2 font-bold">
                <FaReddit className="col-span-1 col-start-2 mr-2 text-3xl" />
                <p>
                    Reddit<span className="text-gray-800">Minimal</span>
                </p>
            </div>
            <form className="flex items-center" onSubmit={onSearchTermSubmit}>
                <input
                    type="text"
                    className="flex-grow h-auto px-4 py-2 bg-gray-200 rounded"
                    placeholder="Search"
                    value={searchTermLocal}
                    onChange={onSearchTermChange}
                    aria-label="Search posts"
                />
                <button
                    className="text-2xl text-gray-600 bg-transparent border-none cursor-pointer"
                    type="submit"
                    onClick={onSearchTermSubmit}
                    aria-label="Search"
                >
                    <HiOutlineSearch />
                </button>
            </form>
        </header>
    );
};

export default Header;
