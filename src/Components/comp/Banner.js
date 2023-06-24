import React from 'react'
import Slider from "react-slick";
import BannerOne from '../assets/bannerImgOne.jpg'
import BannerTwo from '../assets/bannerImgTwo.jpg'
import BannerThree from '../assets/bannerImgThree.jpg'
import BannerFour from '../assets/bannerImgFour.jpg'
import BannerFive from '../assets/bannerImgFive.jpg'


const Banner = () => {
  
  var settings = {
    dots: true,
    infinite: true,
    autoplay : true,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: dots => (
      <div
        style={{
          position: 'absolute',
          top: "80%",
          left: '45%',
          width: '210px',
          transform: 'translate(-50%,-50%)'
        }}
      >
        <ul style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between" }}> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <div
        style={{
          width: "30px",
          height : "30px",
          borderRadius : '50%',
          display : "flex",
          alignItems : "center",
          justifyContent : "center",
          color : "white",
          background : "#131921",
          padding : "8px 0",
          cursor : "pointer",
          border : '1px solid #f3a847'
        }}
      >
        {i + 1}
      </div>
    ),
  };

  return (
    <div className='w-full overflow-hidden z-10 h-[250px] sm:h-auto bg-gray-50'>
      <div className='w-full h-full relative'>
        <Slider {...settings} style={{zIndex:1}}>
          <div className='w-full h-full'>
            <img src={BannerTwo} className='w-full h-[250px] object-cover sm:h-full' alt="" />
          </div>
          <div>
            <img src={BannerOne} className='w-full h-[250px] object-cover sm:h-full' alt="" />
          </div>
          <div>
            <img src={BannerThree} className='w-full h-[250px] object-cover sm:h-full' alt="" />
          </div>
          <div>
            <img src={BannerFour} className='w-full h-[250px] object-cover sm:h-full' alt="" />
          </div>
          <div>
            <img src={BannerFive} className='w-full h-[250px] object-cover sm:h-full' alt="" />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Banner
