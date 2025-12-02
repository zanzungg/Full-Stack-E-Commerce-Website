import React, { useContext, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import { MdOutlineCloudUpload } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import { MyContext } from '../../App';
import { useAuth } from '../../hooks/useAuth';
import { useAuthContext } from '../../contexts/AuthContext';

const AccountSidebar = ({ onAvatarChange }) => {
    const context = useContext(MyContext);
    const navigate = useNavigate();
    const location = useLocation();
    
    // Sử dụng AuthContext và useAuth
    const { user } = useAuthContext();
    const { logout, loading } = useAuth();
    
    // State cho dialog xác nhận logout
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

    // Determine active tab based on current route
    const getActiveTab = () => {
        const path = location.pathname;
        if (path.includes('/my-account')) return 'profile';
        if (path.includes('/my-wishlist')) return 'wishlist';
        if (path.includes('/my-orders')) return 'orders';
        return 'profile';
    };

    const activeTab = getActiveTab();

    const handleOpenLogoutDialog = () => {
        setOpenLogoutDialog(true);
    };

    const handleCloseLogoutDialog = () => {
        setOpenLogoutDialog(false);
    };

    const handleLogout = async () => {
        handleCloseLogoutDialog();
        await logout();
    };

    return (
        <>
            <div className='card bg-white shadow-md rounded-md overflow-hidden'>
                <div className='w-full p-5 flex items-center justify-center flex-col'>
                    <div className='w-[110px] h-[110px] rounded-full overflow-hidden mb-4 relative group'>
                        <img 
                            src={user?.avatar || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV1Mly7C6D_WWpPXTAO4dF52D9Wd9FKuC9zw&s'}
                            alt="User Avatar"
                            className='w-full h-full object-cover' 
                        />

                        <div className='overlay w-full h-full absolute top-0 left-0
                        z-50 bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 
                        transition-all group-hover:opacity-100'>
                            <MdOutlineCloudUpload className='text-white text-[25px]'/>
                            <input 
                                type='file' 
                                accept="image/*"
                                onChange={onAvatarChange}
                                className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                            />
                        </div>
                    </div>

                    <h3 className='font-bold'>{user?.name || 'User Name'}</h3>
                    <h6 className='text-[13px] font-medium'>{user?.email || 'user@example.com'}</h6>
                </div>

                <ul className='list-none pb-5 bg-[#f1f1f1]'>
                    <li className='w-full'>
                        <Button 
                            className={`w-full text-left! justify-start! py-2! px-5! capitalize! rounded-none! flex items-center gap-2 ${
                                activeTab === 'profile' 
                                ? 'bg-primary! text-white!' 
                                : 'text-[rgba(0,0,0,0.7)]! hover:bg-[rgba(0,0,0,0.05)]!'
                            }`}
                            onClick={() => navigate('/my-account')}
                        >
                            <FaRegUser className='text-[17px]'/>
                            <span className='font-semibold'>My Profile</span>
                        </Button>
                    </li>

                    <li className='w-full'>
                        <Button 
                            className={`w-full text-left! justify-start! py-2! px-5! capitalize! rounded-none! flex items-center gap-2 ${
                                activeTab === 'wishlist' 
                                ? 'bg-primary! text-white!' 
                                : 'text-[rgba(0,0,0,0.7)]! hover:bg-[rgba(0,0,0,0.05)]!'
                            }`}
                            onClick={() => navigate('/my-wishlist')}
                        >
                            <FaRegHeart className='text-[17px]'/>
                            <span className='font-semibold'>My Wishlist</span>
                        </Button>
                    </li>

                    <li className='w-full'>
                        <Button 
                            className={`w-full text-left! justify-start! py-2! px-5! capitalize! rounded-none! flex items-center gap-2 ${
                                activeTab === 'orders' 
                                ? 'bg-primary! text-white!' 
                                : 'text-[rgba(0,0,0,0.7)]! hover:bg-[rgba(0,0,0,0.05)]!'
                            }`}
                            onClick={() => navigate('/my-orders')}
                        >
                            <IoBagCheckOutline className='text-[20px]'/>
                            <span className='font-semibold'>My Orders</span>
                        </Button>
                    </li>

                    <li className='w-full'>
                        <Button 
                            className="w-full text-left! justify-start! py-2! px-5! capitalize! text-[rgba(0,0,0,0.7)]! rounded-none! flex items-center gap-2 hover:bg-[rgba(0,0,0,0.05)]!"
                            onClick={handleOpenLogoutDialog}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <CircularProgress size={17} className='text-[rgba(0,0,0,0.7)]!'/>
                                    <span className='font-semibold'>Logging out...</span>
                                </>
                            ) : (
                                <>
                                    <IoLogOutOutline className='text-[20px]'/>
                                    <span className='font-semibold'>Logout</span>
                                </>
                            )}
                        </Button>
                    </li>
                </ul>
            </div>

            {/* Logout Confirmation Dialog */}
            <Dialog
                open={openLogoutDialog}
                onClose={handleCloseLogoutDialog}
                aria-labelledby="logout-dialog-title"
                aria-describedby="logout-dialog-description"
                PaperProps={{
                    sx: {
                        borderRadius: '8px',
                        minWidth: '400px'
                    }
                }}
            >
                <DialogTitle id="logout-dialog-title" className='font-bold'>
                    Confirm Logout
                </DialogTitle>
                <DialogContent>
                    <p className='text-[14px] text-gray-600'>
                        Are you sure you want to logout from your account?
                    </p>
                </DialogContent>
                <DialogActions className='px-6 pb-4'>
                    <Button 
                        onClick={handleCloseLogoutDialog}
                        className='capitalize! text-gray-600!'
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                    <Button 
                        onClick={handleLogout}
                        variant="contained"
                        className='capitalize! bg-red-500! hover:bg-red-600!'
                        disabled={loading}
                        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : null}
                    >
                        {loading ? 'Logging out...' : 'Logout'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AccountSidebar;