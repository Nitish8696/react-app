import React from 'react'

const FooterBottom = () => {
  const list = [
    {
      id: 1,
      heading: 'AbeBooks',
      link: 'Books, art & collectibles'
    },
    {
      id: 2,
      heading: 'Amazon Web Services',
      link: 'Scalable Cloud Computing Services'
    },
    {
      id: 3,
      heading: 'Audible',
      link: 'Download Audio Books'
    },
    {
      id: 4,
      heading: '	DPReview',
      link: 'Digital Photography'
    },
    {
      id: 5,
      heading: 'IMDb',
      link: 'Movies, TV & Celebrities'
    },
    {
      id: 6,
      heading: 'Shopbop',
      link: 'Designer Fashion Brands'
    },
    {
      id: 7,
      heading: 'Amazon Business',
      link: 'Everything For Your Business'
    },
    {
      id: 8,
      heading: 'Prime Now',
      link: '2-Hour Delivery on Everyday Items'
    },
    {
      id: 9,
      heading: 'Amazon Prime Music',
      link: '100 million songs, ad-free Over 15 million podcast episodes'
    },
  ]
  return (
    <div className='w-full bg-[#131a22]'>
      <div className='max-w-5xl mx-auto'>
        <div className='w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:px-0 gap-10 place-content-center text-gray-400 p-10'>
            {list.map((item) => {
              return <div className='group cursor-pointer' key={item.id}>
                <h3 className='w-24 font-semibold text-[15px] py-1 group-hover:underline text-[#DDD] leading-3 mb-[2px]'>{item.heading}</h3>
                <p className='w-24 tracking-tight text-[14px] text-[#999] group-hover: underline leading-3'>{item.link}</p>
              </div>
            })}
        </div>
      </div>
    </div>
  )
}

export default FooterBottom
