import React, { useState, useContext } from "react";
import { Button } from "@mui/material";
import MyListItems from "./myListItems";
import AccountSidebar from '../../components/AccountSidebar';
import { MyContext } from '../../App';

const MyWishList = () => {
    const context = useContext(MyContext);
    
    const [userInfo, setUserInfo] = useState({
        fullName: 'User Full Name',
        email: 'example@example.com',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV1Mly7C6D_WWpPXTAO4dF52D9Wd9FKuC9zw&s'
    });

    const [wishlistItems, setWishlistItems] = useState([
        {
            id: 1,
            name: 'A-Line Kurti With Sharara & Dupatta',
            brand: 'Sangria',
            price: 58.00,
            oldPrice: 128.00,
            discount: '55%',
            rating: 4,
            image: 'https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg'
        },
        {
            id: 2,
            name: 'Women Ethnic Dress',
            brand: 'Biba',
            price: 45.00,
            oldPrice: 90.00,
            discount: '50%',
            rating: 5,
            image: 'https://serviceapi.spicezgold.com/download/1753722939206_125c18d6-592d-4082-84e5-49707ae9a4fd1749366193911-Flying-Machine-Women-Wide-Leg-High-Rise-Light-Fade-Stretchab-1.jpg'
        }
    ]);

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

    const handleRemoveItem = (id) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== id));
        context.openAlertBox("success", "Item removed from wishlist!");
    };

    const handleAddToCart = (item) => {
        context.openAlertBox("success", `${item.name} added to cart!`);
    };

    return (
        <section className="section py-10 pb-10">
            <div className="container flex gap-5">
                {/* Sidebar */}
                <div className='col1 w-[25%]'>
                    <AccountSidebar 
                        userInfo={userInfo} 
                        onAvatarChange={handleAvatarChange}
                    />
                </div>

                {/* Main Content */}
                <div className="col2 w-[75%]">
                    <div className="shadow-md rounded-md bg-white">
                        <div className="py-5 px-5 border-b border-[rgba(0,0,0,0.1)]">
                            <h2 className="text-[22px] font-bold">My Wishlist</h2>
                            <p className="mt-0 text-gray-600">
                                There are <span className="font-bold text-primary">{wishlistItems.length}</span> products in your wishlist
                            </p>
                        </div>

                        {wishlistItems.length > 0 ? (
                            <div className="p-3">
                                {wishlistItems.map(item => (
                                    <MyListItems 
                                        key={item.id} 
                                        item={item}
                                        onRemove={() => handleRemoveItem(item.id)}
                                        onAddToCart={() => handleAddToCart(item)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="p-10 text-center">
                                <img 
                                    src="/empty-wishlist.png" 
                                    alt="Empty Wishlist" 
                                    className="w-[200px] mx-auto mb-4 opacity-50"
                                />
                                <h3 className="text-[18px] font-semibold text-gray-600 mb-2">
                                    Your wishlist is empty
                                </h3>
                                <p className="text-gray-500 mb-4">
                                    Add items you like to your wishlist. Review them anytime and easily move them to cart.
                                </p>
                                <Button 
                                    className="btn-org"
                                    onClick={() => window.location.href = '/'}
                                >
                                    Continue Shopping
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyWishList;