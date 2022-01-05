import React, { useEffect } from "react";

import { Navigation, Scrollbar, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieOnSliderView from "./MovieOnSliderView";
import getTmdbTrendings from "../redux/actions/getTmdbTrendings";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import "../styles/home_trendings.sass";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps, { getTmdbTrendings })(
  function HomeTrendings({ getTmdbTrendings, trendings }) {
    useEffect(() => {
      getTmdbTrendings();
    }, []);
    const renderTrendingsList = () => {
      return trendings.map((trend) => {
        return (
          <SwiperSlide title={trend.title || trend.name} key={trend.id}>
            <MovieOnSliderView trend={trend} />
          </SwiperSlide>
        );
      });
    };
    return (
      <div className="home-trendings-slider-container">
        <div className="container">
          <div className="row">
            <div className="offset-1 col-10">
              <p className="slider-title">
                <i className="fal fa-poll-h me-2"></i>
                trending now
              </p>
              <Swiper
                className="home-trendings-slider"
                modules={[Navigation, Autoplay, Scrollbar]}
                spaceBetween={25}
                slidesPerView={4}
                scrollbar={{ draggable: true }}
                // loop={true}
                autoplay={{
                  delay: 300000,
                  disableOnInteraction: false,
                }}
                speed={1000}
              >
                {renderTrendingsList()}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
