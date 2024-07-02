import React from 'react'

const TopDeal = (props) => {
  
    let Prods = <div className='topdeal1 grayback'>
        <h3>Top Deals on {props.cat[0].toUpperCase() + props.cat.slice(1)}</h3>
        <div className='topdeal--cards'>
        {props.prod.map((pro,index) =>{
            return <div key={index} className='topdeal--card'>
                <img className='topdeal--img hoverscale' src={pro.img}/>
                <p className='topdeal--name'>{pro.name[0].toUpperCase() + pro.name.slice(1)}</p>
                <b>Upto 30% Off </b>
            </div>
        })}</div>
    </div>
    
    return (
    <>
        {Prods}
    </>
  )
}

export default TopDeal