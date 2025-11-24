import React, { useState, useContext } from 'react';
import { Button } from '@mui/material';
import { MdEdit } from "react-icons/md";
import TextField from "@mui/material/TextField";
import { MyContext } from '../../App';
import AccountSidebar from '../../components/AccountSidebar';

const MyAccount = () => {
    const context = useContext(MyContext);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const [userInfo, setUserInfo] = useState({
        fullName: 'User Full Name',
        email: 'example@example.com',
        phone: '+1 234 567 8900',
        address: '123 Main Street, City, Country',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV1Mly7C6D_WWpPXTAO4dF52D9Wd9FKuC9zw&s'
    });

    const [formFields, setFormFields] = useState({ ...userInfo });

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserInfo({ ...userInfo, avatar: reader.result });
                context.openAlertBox("success", "Avatar updated successfully!");
            };
            reader.readAsDataURL(file);
        }
    };

    const onChangeField = (e) => {
        const { name, value } = e.target;
        setFormFields({
            ...formFields,
            [name]: value
        });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        setUserInfo({ ...formFields });
        setIsEditMode(false);
        context.openAlertBox("success", "Profile updated successfully!");
    };

    const handleCancelEdit = () => {
        setFormFields({ ...userInfo });
        setIsEditMode(false);
    };

    return (
        <section className='py-10 w-full'>
            <div className='container flex gap-5'>
                {/* Sidebar */}
                <div className='col1 w-[25%]'>
                    <AccountSidebar 
                        userInfo={userInfo} 
                        onAvatarChange={handleAvatarChange}
                    />
                </div>

                {/* Main Content */}
                <div className='col2 w-[75%]'>
                    <div className='card bg-white shadow-md rounded-md p-6'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-[22px] font-bold'>My Profile</h2>
                            {!isEditMode && (
                                <Button 
                                    className='btn-org flex items-center gap-2'
                                    onClick={() => setIsEditMode(true)}
                                >
                                    <MdEdit className='text-[18px]'/>
                                    Edit Profile
                                </Button>
                            )}
                        </div>

                        {isEditMode ? (
                            <form onSubmit={handleSaveProfile} className='space-y-5'>
                                <div className='grid grid-cols-2 gap-4'>
                                    <TextField
                                        label="Full Name"
                                        variant="outlined"
                                        name="fullName"
                                        value={formFields.fullName}
                                        onChange={onChangeField}
                                        fullWidth
                                        required
                                    />

                                    <TextField
                                        label="Email"
                                        variant="outlined"
                                        type="email"
                                        name="email"
                                        value={formFields.email}
                                        onChange={onChangeField}
                                        fullWidth
                                        required
                                    />

                                    <TextField
                                        label="Phone"
                                        variant="outlined"
                                        name="phone"
                                        value={formFields.phone}
                                        onChange={onChangeField}
                                        fullWidth
                                    />

                                    <TextField
                                        label="Address"
                                        variant="outlined"
                                        name="address"
                                        value={formFields.address}
                                        onChange={onChangeField}
                                        fullWidth
                                    />
                                </div>

                                <div className='flex gap-3 justify-end'>
                                    <Button 
                                        type="button"
                                        className='btn-outline'
                                        onClick={handleCancelEdit}
                                    >
                                        Cancel
                                    </Button>
                                    <Button 
                                        type="submit"
                                        className='btn-org'
                                    >
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        ) : (
                            <div className='space-y-4'>
                                <div className='flex border-b pb-4'>
                                    <div className='w-[30%] font-semibold text-gray-600'>Full Name:</div>
                                    <div className='w-[70%]'>{userInfo.fullName}</div>
                                </div>

                                <div className='flex border-b pb-4'>
                                    <div className='w-[30%] font-semibold text-gray-600'>Email:</div>
                                    <div className='w-[70%]'>{userInfo.email}</div>
                                </div>

                                <div className='flex border-b pb-4'>
                                    <div className='w-[30%] font-semibold text-gray-600'>Phone:</div>
                                    <div className='w-[70%]'>{userInfo.phone}</div>
                                </div>

                                <div className='flex border-b pb-4'>
                                    <div className='w-[30%] font-semibold text-gray-600'>Address:</div>
                                    <div className='w-[70%]'>{userInfo.address}</div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Additional Info Cards */}
                    <div className='grid grid-cols-3 gap-4 mt-5'>
                        <div className='card bg-white shadow-md rounded-md p-5 text-center'>
                            <div className='text-[32px] font-bold text-primary'>24</div>
                            <div className='text-gray-600'>Total Orders</div>
                        </div>

                        <div className='card bg-white shadow-md rounded-md p-5 text-center'>
                            <div className='text-[32px] font-bold text-primary'>12</div>
                            <div className='text-gray-600'>Wishlist Items</div>
                        </div>

                        <div className='card bg-white shadow-md rounded-md p-5 text-center'>
                            <div className='text-[32px] font-bold text-primary'>5</div>
                            <div className='text-gray-600'>Pending Orders</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyAccount;