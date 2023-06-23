import React from 'react'
import video from '../assets/video.webm'
import Video from '../assets/videomob.webm'
import './Banner.scss'

const Banner = () => {
  return (
    <div className='banner'>
      <video
        src={video}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        className="w-full h-full object-cover z-1 video-des"
      />
      <video
        src={Video}
        type="video/mp4"
        loop
        controls={false}
        muted
        autoPlay
        className="w-full h-full object-cover z-1 video-mob"
      />
      <div className='banner-details'>
        <p className='text-white z-10 text-5xl font-bold mb-5 b-heading'>Galaxy S23 Series</p>
        <p className='text-white mb-5 b-sub-heading'>Own Epic Now at just $40/month <br />
          avail benefits up to $400
        </p>
        <button className='text-black bg-white px-5 py-2 rounded-full text-sm'>Buy Now</button>
      </div>
    </div>
  );
}

export default Banner
