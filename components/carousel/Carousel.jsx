'use client'

import Slider from "react-slick";
import { NextArrow, PrevArrow } from "./Arrows";
import Slide from "./Slide";
const sliderContent = [
    {
        ID: 1,
        title: "Entertainment and the growth of Creativity",
        description: "You will find the best fabrics, the hottest designs, and the most popular brands at reasonable prices. Look your best and stand out among the crowd.",
        bgImg: "url('https://raw.githubusercontent.com/ZahraMirzaei/online-shop/main/public/images/slider-img/beauty-banner.webp')",
        url: "/",
    },
    {
        ID: 2,
        title: "stationeryBT",
        description: "We provide the best Experience with the most popular Brands.  With a warranty of 18 months, you can be confident in your choice",
        bgImg: "url('https://images.pexels.com/photos/15569152/pexels-photo-15569152.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load')",
        url: "/",
    },
    {
        ID: 3,
        title: "toyBT",
        description: "We provide the best Experience with the most popular Brands.  With a warranty of 18 months, you can be confident in your choiceoyBD",
        bgImg: "url('https://raw.githubusercontent.com/ZahraMirzaei/online-shop/main/public/images/slider-img/digital-banner.webp')",
        url: "/",
    },
    {
        ID: 4,
        title: "houseBT",
        description: "enjoy beautiful moments of satisfaction and peace with your loved ones at home with products designed according to the most recent and prominent styles.",
        bgImg: "url('https://raw.githubusercontent.com/ZahraMirzaei/online-shop/main/public/images/slider-img/house-banner.webp')",
        url: "/",
    },
    {
        ID: 5,
        title: "fashionBT",
        description: "You will find the best fabrics, the hottest designs, and the most popular brands at reasonable prices. Look your best and stand out among the crowd.",
        bgImg: "url('https://raw.githubusercontent.com/ZahraMirzaei/online-shop/main/public/images/slider-img/fashion-banner.webp')",
        url: "/",
    },
];

const Carousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow to="next" />,
        prevArrow: <PrevArrow to="prev" />,
        appendDots: (dots) => (
            <div className="bg-transparent !pb-[40px]">
                <ul> {dots} </ul>
            </div>
        ),
    };

    return (
        <div className="relative">
            <Slider {...settings}>
                {sliderContent.map((slideContent) => {
                    return <Slide key={slideContent.ID} {...slideContent} />;
                })}
            </Slider>
        </div>
    );
};

export default Carousel;