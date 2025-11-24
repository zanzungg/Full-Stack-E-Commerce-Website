import React from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import { Button } from "@mui/material";

const MyListItems = ({ item, onRemove, onAddToCart }) => {
    return (
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
            <div className="img w-[15%] rounded-md overflow-hidden">
                <Link to={`/product/${item.id}`} className="group">
                    <img 
                        src={item.image}
                        className="w-full group-hover:scale-105 transition-all"
                        alt={item.name}
                    />
                </Link>
            </div>

            <div className="info w-[85%] relative">
                <IoCloseSharp 
                    className="cursor-pointer absolute top-0 right-0 text-[22px] link transition-all hover:text-red-500"
                    onClick={onRemove}
                />
                <span className="text-[13px] text-gray-600">{item.brand}</span>
                <h3 className="text-[15px] font-semibold">
                    <Link to={`/product/${item.id}`} className="link">
                        {item.name}
                    </Link>
                </h3>

                <Rating 
                    name="size-small" 
                    value={item.rating} 
                    size="small" 
                    readOnly
                />

                <div className="flex items-center gap-4 mt-4 mb-4">
                    <span className="price text-black font-semibold text-[14px]">
                        ${item.price.toFixed(2)}
                    </span>
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-medium">
                        ${item.oldPrice.toFixed(2)}
                    </span>
                    <span className="price text-primary font-semibold text-[14px]">
                        {item.discount} OFF
                    </span>
                </div>

                <Button 
                    className="btn-org btn-sm"
                    onClick={onAddToCart}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    )
}

export default MyListItems;