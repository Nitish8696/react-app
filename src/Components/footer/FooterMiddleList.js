import React from 'react'

const FooterMiddleList = ({heading,links}) => {
    return (
        <div>
            <h3 className='text-white text-base font-semibold mb-3'>{heading}</h3>
            <ul className='flex flex-col gap-2'>
                {links.map((link)=>{
                   return <li className='footerLink'>{link}</li>
                })}
            </ul>
        </div>
    )
}

export default FooterMiddleList
