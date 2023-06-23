import React from 'react'
import FooterMiddleList from './FooterMiddleList'
import { GiIndianPalace } from 'react-icons/gi'

const FooterMiddle = () => {
    const list = [
        {
            id:1,
            heading : 'Get to Know Us',
            links : [
                "About Us","Careers","Press Releases","Amazon Science",
            ]
        },
        {
            id:2,
            heading : 'Connect with Us',
            links : [
                "Facebook","Twitter","Instagram",
            ]
        },
        {
            id:3,
            heading : 'Make Money with Us',
            links : [
                "Sell on Amazon","Sell under Amazon Accelerator","Protect and Build Your Brand"
                ,"Amazon Global Selling","Become an Affiliate","Fulfilment by Amazon"
                ,"Advertise Your Products","Amazon Pay on Merchants"
            ]
        },
        {
            id:4,
            heading : 'Let Us Help You',
            links : [
                "COVID-19 and Amazon","Your Account","Returns Centre","100% Purchase Protection",
                "Amazon App Download","Help"
            ]
        },
    ]
    return (
        <div className='w-full bg-[#232F3E]'>
            <div className='w-full border-b-[1px] border-gray-500 p-10'>
                <div className='max-w-5xl mx-auto text-gray-300'>
                    <div className='grid w-full grid-cols-1 md:grid-cols-2 xl:grid-cols-4'>
                      {list.map((item)=>{
                        return <FooterMiddleList key={item.id} heading={item.heading} links={item.links} />
                      })}
                    </div>
                </div>
            </div>
            <div className='w-full flex gap-6 items-center justify-center py-6'>
                <div className='flex gap-2'>
                    <p className='flex gap-1 items-center justify-center border border-gray-500
                hover:border-yellow-400 cursor-pointer duration-200 px-2 py-1 text-white'>English</p>
                </div>
                <div className='flex gap-1 items-center justify-center border border-gray-500
                hover:border-yellow-400 cursor-pointer duration-200 px-2 py-1 text-white'>
                    <GiIndianPalace/>
                    <p>India</p>
                </div>
            </div>
        </div>
    )
}

export default FooterMiddle
