import React from 'react'


const FooterComponent = (props) => {

    const lis = props.opt.map((li,index)=>{
        return <li key={index} className='footer--li'><a href={li.link} className='footer--links'>{li.name}</a></li>
    })

    return (
    <div className='footercomponent'>
        <p className='footer--heading'>{props.heading}</p>
        <ul className='footer--ul'>
            {lis}
        </ul>
        
    </div>
  )
}

export default FooterComponent