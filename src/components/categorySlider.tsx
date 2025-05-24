import React, { FC } from "react";
import { Autoplay, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/effect-fade';


interface CategorySliderProps{
    imgs : string[];
    width? : string | number;
    height? : string | number;
}
const CategorySlider : FC<CategorySliderProps> = ({ imgs, width = 500, height = 500}) => {
    const sliderStyle = React.CSSProperties = {
        width : typeof width === 'number' ? `${width}px` : width,
        height : typeof height === 'number' ? `${height}px` : height,
    }
    return(
        <Swiper
            style={sliderStyle}
            loop={true}
            slidesPerView={1}
            autoplay={{ delay: 2000, disableOnInteraction: false}}
            speed={3000}
            modules={[Autoplay, EffectFade]}
            effect="fade"
        >
            {imgs.map((imgSrc,idx) => (
                <SwiperSlide key={idx}>
                    <img src={imgSrc} style = {{width :'100%', height :'100%' ,objectFit : 'cover'}}/>
                </SwiperSlide>
            ))}

        </Swiper>
    )
}

export default CategorySlider;