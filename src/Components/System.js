import React, { useEffect, useState } from 'react'

const System = () => {
    const proxyUrl = 'https://allorigins.win/'
    const [data, setData] = useState(null)
    const imgUrl = "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/"
    async function fetchData() {
        const res = await fetch(proxyUrl+'https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.5529907&lng=76.6345735&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
        const json = await res.json()
        console.log(json);
        if (json) {
            setData(json.data.cards[2].card.card.gridElements.infoWithStyle.restaurants);
        }

    }
    const obj = [{ name: 'amar' }, { name: 'moni' }, { name: 'rahul' },]
    console.log(obj[1]);
    useEffect(() => {
        fetchData()
    }, [])
    console.log(data);
    return (
        <div>
            {data.map((item) => {
                const {info} = item 
                return 
            })}
        </div>
    )
}

export default System
