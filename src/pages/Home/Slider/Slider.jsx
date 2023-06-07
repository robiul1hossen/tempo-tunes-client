import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import "./Slider.css";

import slider1 from "../../../assets/slider images/1.jpg";
import slider2 from "../../../assets/slider images/2.jpg";
import slider3 from "../../../assets/slider images/3.jpg";
import slider4 from "../../../assets/slider images/4.jpg";
import slider5 from "../../../assets/slider images/5.jpg";
import slider6 from "../../../assets/slider images/6.jpg";
import slider7 from "../../../assets/slider images/7.jpg";
import slider8 from "../../../assets/slider images/8.jpg";
import slider9 from "../../../assets/slider images/9.jpg";

const Slider = () => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className="mx-auto text-center">
          <img className="h-[75vh]" src={slider1} />
        </SwiperSlide>
        <SwiperSlide className="mx-auto text-center">
          <img className="h-[75vh]" src={slider2} />
        </SwiperSlide>
        <SwiperSlide className="mx-auto text-center">
          <img className="h-[75vh]" src={slider3} />
        </SwiperSlide>
        <SwiperSlide className="mx-auto text-center">
          <img className="h-[75vh]" src={slider4} />
        </SwiperSlide>
        <SwiperSlide className="mx-auto text-center">
          <img className="h-[75vh]" src={slider5} />
        </SwiperSlide>
        <SwiperSlide className="mx-auto text-center">
          <img className="h-[75vh]" src={slider6} />
        </SwiperSlide>
        <SwiperSlide className="mx-auto text-center">
          <img className="h-[75vh]" src={slider7} />
        </SwiperSlide>
        <SwiperSlide className="mx-auto text-center">
          <img className="h-[75vh]" src={slider8} />
        </SwiperSlide>
        <SwiperSlide className="mx-auto text-center">
          <img className="h-[75vh]" src={slider9} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
