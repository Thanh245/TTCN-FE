import React from "react";
import "./Slider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade
} from "swiper";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

const data = [
  {
    id: 1,
    url: "/images/slider/1.png",
    username: "Ring",
    testimonial: "abcd1"
  },
  {
    id: 2,
    url: "/images/slider/2.png",
    username: "Earring",
    testimonial: "abcd2"
  },
  {
    id: 3,
    url: "/images/slider/3.png",
    username: "Necklaces ",
    testimonial: "abcd3"
  },
  {
    id: 4,
    url: "/images/slider/4.png",
    username: "Balacelets",
    testimonial: "abcd4"
  },
  {
    id: 5,
    url: "/images/slider/5.png",
    username: "Painting",
    testimonial: "abcd5"
  },
  {
    id: 6,
    url: "/images/slider/6.png",
    username: "Scuplture",
    testimonial: "abcd6"
  }
  ,
  {
    id: 7,
    url: "/images/slider/7.png",
    username: "Flower Self",
    testimonial: "abcd6"
  }
];
export default function Slider() {
  return (
    <Swiper
      effect="fade"
      spaceBetween={20}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log("slide schange")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((user) => (
        <SwiperSlide key={user.id} className="slide">
          <div className="slide-content">
            <div className="user-image">
              <img src={process.env.PUBLIC_URL +  user.url} alt="dm" className="user-photo" />
            </div>
            <h2>{user.username}</h2>
            <p className="user-testimonial">
              "<i>{user.testimonial}</i>"
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
