import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className='top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px]'>
                <div className='container'>
                    <div className='flex items-center justify-between'>
                        <div className='col1 w-[50%]'>
                            <p className='text-[14px] font-[500]'>
                                Get up to 50% off new season style, limited time only.
                            </p>
                        </div>

                        <div className='col2 flex items-center justify-end'>
                            <ul>
                                <li className='list-none'>
                                    <Link to="help-center">Help Center</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
        </header>
    )
};

export default Header;