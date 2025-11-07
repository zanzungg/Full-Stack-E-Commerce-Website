import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductItem from "../ProductItem";

const ProductsSlider = (props) => {
    return (
        <div className="productsSlider py-3">
            <Swiper
                modules={[Navigation]}
                navigation={{ prevEl: ".pro-prev", nextEl: ".pro-next" }}
                spaceBetween={16}
                slidesPerView={props.items}
                breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: props.items },
                }}
                className="relative py-4"
            >
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>
            <SwiperSlide>
                <ProductItem/>
            </SwiperSlide>

            {/* Navigation buttons */}
            <NavButton direction="prev" className="pro-prev left-3" />
            <NavButton direction="next" className="pro-next right-3" />

            </Swiper>
        </div>
    )
}

const NavButton = ({ direction, className }) => {
  const isPrev = direction === "prev";
  return (
    <button
      className={`
        ${className}
        absolute top-1/2 -translate-y-1/2 
        ${isPrev ? 'left-4' : 'right-4'}
        z-10 flex h-11 w-11 items-center justify-center 
        rounded-full bg-white text-gray-800 shadow-lg 
        transition-all hover:bg-red-500 hover:text-white
      `}
    >
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d={
            isPrev
              ? "M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              : "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
          }
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
};

export default ProductsSlider;