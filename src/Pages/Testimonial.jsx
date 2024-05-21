import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from "react-slick";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import Api function area
import { testimonial } from '../Allreducers/testimonialslice';

const Testimonial = () => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  const dispatch = useDispatch();

  const { testimonialdata, loading } = useSelector((state) => state.mytestimonial);

  useEffect(() => {
    dispatch(testimonial());
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="slider-container">
            <h1 className='mb-5' style={{ textAlign: 'center' }}>Testimonial</h1>
            <Slider {...settings} autoPlay={true} interval={5000}>
              {testimonialdata?.map((testi, index) => {
                return (
                  <div key={index} className="testimonial-card">
                    <img src={`${process.env.REACT_APP_BASE_URL}${testi.image}`} alt="testimonial" className="testimonial-image" style={{ height: '100px', borderRadius: '50%', margin: '0 auto' }} />
                    <div className="testimonial-content text-center">
                      <h3 className="client-name mt-3">{testi?.client_name}</h3>
                      <p className="review">{testi?.review}</p>
                    </div>
                  </div>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom arrow components
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

export default Testimonial;
