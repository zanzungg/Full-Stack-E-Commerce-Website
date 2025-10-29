import React from "react";
import '../Search/style.css';
import { IoSearch } from "react-icons/io5";
import Button from '@mui/material/Button';
const Search = () => {
    return (
        <div className="searchBox w-full h-[50px] bg-[#e5e5e5] rounded-[5px] flex items-center px-2 overflow-hidden">
            <input 
                type="text"
                placeholder="Search for products..." 
                className="flex-1 h-full focus:outline-none bg-transparent px-2 text-[15px]"
            />
            <Button className="w-[37px]! min-w-[37px]! h-[37px] rounded-full! text-black!">
                <IoSearch className="text-[#4e4e4e] text-[22px]" />
            </Button>
        </div>
    );
} 

export default Search;