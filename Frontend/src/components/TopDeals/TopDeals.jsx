import React from 'react'
import TopDeal from './TopDeal'

const TopDeals = (props) => {
    const deals = props.categories.map(cat => ({
        cat,
        prod: props.products.filter(product => product.category === cat)
    }));

    const TopDeals = deals.map((deal,index)=>{
        return <TopDeal 
                    key={index} 
                    className='topdeal' 
                    cat={deal.cat} 
                    prod={deal.prod} 
                />
    })   

    return(<div>{TopDeals}</div>)
}

export default TopDeals