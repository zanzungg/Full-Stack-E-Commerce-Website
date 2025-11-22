import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { GoTriangleDown } from "react-icons/go";
import Rating from '@mui/material/Rating';

const CartItems = (props) => {
    const [sizeAnchorEl, setSizeAnchorEl] = useState(null);
    const [selectedSize, setSelectedSize] = useState(props.size);
    const openSize = Boolean(sizeAnchorEl);

    const [qtyAnchorEl, setQtyAnchorEl] = useState(null);
    const [selectedQty, setSelectedQty] = useState(props.qty);
    const openQty = Boolean(qtyAnchorEl);

    const handleClickSize = (event) => {
        setSizeAnchorEl(event.currentTarget);
    };
    const handleCloseSize = (value) => {
        setSizeAnchorEl(null);
        if (value !== null) {
            setSelectedSize(value)
        }
    };

    const handleClickQty = (event) => {
        setQtyAnchorEl(event.currentTarget);
    };
    const handleCloseQty = (value) => {
        setQtyAnchorEl(null);
        if (value !== null) {
            setSelectedQty(value)
        }
    };

    return (
        <div className="cartItem w-full p-3 flex items-center gap-4 pb-5 border-b border-[rgba(0,0,0,0.1)]">
            <div className="img w-[15%] rounded-md overflow-hidden">
                <Link to="/product/312" className="group">
                    <img src="https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg"
                    className="w-full group-hover:scale-105 transition-all"/>
                </Link>
            </div>

            <div className="info w-[85%] relative">
                <IoCloseSharp className="cursor-pointer absolute top-0 right-0 text-[22px] link transition-all"/>
                <span className="text-[13px]">Sangria</span>
                <h3 className="text-[15px] font-semibold">
                    <Link className="link">A-Line Kurti With Sharara & Dupatta</Link>
                </h3>

                <Rating name="size-small" defaultValue={2} size="small" readOnly/>

                <div className="flex items-center gap-4 mt-2">
                    <div className="relative">
                        <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-semibold
                        py-1 px-2 rounded-md cursor-pointer"
                        onClick={handleClickSize}>
                            Size: {selectedSize} <GoTriangleDown />
                        </span>

                        <Menu
                            id="size-menu"
                            anchorEl={sizeAnchorEl}
                            open={openSize}
                            onClose={()=>handleCloseSize(null)}
                            slotProps={{
                            list: {
                                'aria-labelledby': 'basic-button',
                            },
                            }}
                        >
                            <MenuItem onClick={()=>handleCloseSize('S')}>S</MenuItem>
                            <MenuItem onClick={()=>handleCloseSize('M')}>M</MenuItem>
                            <MenuItem onClick={()=>handleCloseSize('L')}>L</MenuItem>
                            <MenuItem onClick={()=>handleCloseSize('XL')}>XL</MenuItem>
                            <MenuItem onClick={()=>handleCloseSize('XXL')}>XXL</MenuItem>
                        </Menu>
                    </div>

                    <div className="relative">
                        <span className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-semibold
                        py-1 px-2 rounded-md cursor-pointer"
                        onClick={handleClickQty}>
                            Qty: {selectedQty} <GoTriangleDown />
                        </span>

                        <Menu
                            id="qty-menu"
                            anchorEl={qtyAnchorEl}
                            open={openQty}
                            onClose={()=>handleCloseQty(null)}
                            slotProps={{
                            list: {
                                'aria-labelledby': 'basic-button',
                            },
                            }}
                        >
                            <MenuItem onClick={()=>handleCloseQty(1)}>1</MenuItem>
                            <MenuItem onClick={()=>handleCloseQty(2)}>2</MenuItem>
                            <MenuItem onClick={()=>handleCloseQty(3)}>3</MenuItem>
                            <MenuItem onClick={()=>handleCloseQty(4)}>4</MenuItem>
                            <MenuItem onClick={()=>handleCloseQty(5)}>5</MenuItem>
                        </Menu>
                    </div>
                </div>

                <div className="flex items-center gap-4 mt-2">
                    <span className="price text-black font-semibold text-[14px]">$58.00</span>
                    <span className="oldPrice line-through text-gray-500 text-[14px] font-medium">$58.00</span >
                    <span className="price text-primary font-semibold text-[14px]">55% OFF</span>

                </div>
            </div>
        </div>
    )
}

export default CartItems;