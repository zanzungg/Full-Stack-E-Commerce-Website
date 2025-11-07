import React from "react";
import HomeSlider from "../../components/HomeSlider";
import HomeCategorySlider from "../../components/HomeCategorySlider";
import { LiaShippingFastSolid } from "react-icons/lia";
import AdsBannerSlider from "../../components/AdsBannerSlider";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ProductsSlider from "../../components/ProductsSlider";

const Home = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <HomeSlider/>
            <HomeCategorySlider/>

            <section className="bg-white py-8 ">
                <div className="container">
                    <div className="flex items-center justify-between">
                        <div className="leftSec w-[40%] pl-5">
                            <h2 className="font-semibold text-[20px]">Popular Products</h2>
                            <p className="font-normal text-[14px]">Do not miss the current offers until the end of March.</p>
                        </div>

                        <div className="rightSec w-[60%]">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs example"
                            >
                                <Tab label="Fashion" />
                                <Tab label="Electronics" />
                                <Tab label="Bags" />
                                <Tab label="Footwear" />
                                <Tab label="Groceries" />
                                <Tab label="Beauty" />
                                <Tab label="Wellness" />
                                <Tab label="Jewellery" />
                            </Tabs>
                        </div>
                    </div>


                    <ProductsSlider items={6}/>
                </div>
            </section>

            <section className="py-5 bg-white">
                <div className="container">
                    <div className="freeShipping w-[80%] mx-auto py-4 p-4 border-2 border-primary flex items-center 
                    justify-between rounded-md mb-7">
                        <div className="col1 flex items-center gap-4">
                            <LiaShippingFastSolid className="text-[50px]"/>
                            <span className="text-[20px] font-semibold uppercase">Free Shipping</span>
                        </div>

                        <div className="col2">
                            <p className="mb-0 font-medium">Free Delivery Now On Your First Order and over $200</p>
                        </div>

                        <p className="font-bold text-[30px]">- Only $200*</p>
                    </div>

                    <AdsBannerSlider items={4}/>
                </div>
            </section>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
        </div>
    );
}

export default Home;