import React from 'react'
import gown from '../../assets/types/cloth1.jpg'

const TopDeal = (props) => {
    const pro= props.product
console.log(props)
    const Prods = <div className='topdeal--cards'>
            <div className='topdeal--card'>
                <img className='topdeal--img hoverscale' src={gown} />
                <p className='topdeal--name'>{pro.product_name[0].toUpperCase() + pro.product_name.slice(1)}</p>
                <p className='topdeal--desc'>pro.product_desc</p>
                <div className='topdeal--details'><p>4.9 ⭐</p>
                    <p className='price'>₹{pro?.price}  <s className='topdeal--desc'>₹1,377</s></p>
                    <p className='free-delivery'>Free Delivery</p>
                </div>
            </div>
        </div>

    return (
        <>
            {Prods}
        </>
    )
}

export default TopDeal