import React from 'react'
import FooterComponent from './FooterComponent'

const Footer = () => {
  return (
    <div className='footer'>
      <FooterComponent heading="ABOUT" opt={[
          {name:"Contact Us",link:"#"},
          {name:"About Us",link:"#"},
          {name:"Careers",link:"#"},
          {name:"Press",link:"#"}
        ]} />
        <FooterComponent heading="GROUP COMPANIES" opt={[
          {name:"Mynthra",link:"#"},
          {name:"Cleartrip",link:"#"},
          {name:"Shopsy",link:"#"}
        ]} />
        <FooterComponent heading="HELP" opt={[
          {name:"Payment",link:"#"},
          {name:"Shipping",link:"#"},
          {name:"Cancellation & Return",link:"#"},
          {name:"FAQ",link:"#"}
        ]} />
        
    </div>
  )
}

export default Footer