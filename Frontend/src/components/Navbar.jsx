import React from 'react'
import Logo from '../assets/flipkart-logo.svg'
import { IoIosSearch } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaCartArrowDown } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='navbar--logo' src={Logo} />
      <form className="navbar--form">
        <input className='navbar--input' type="text" placeholder="Search for Products, Brands and More" name="search" />
        <button className='navbar--search' type="submit"><IoIosSearch /></button>
      </form><span className='navbar--buttons'>
      <button className='navbar--login'><CgProfile/> Login</button>
      <button className='navber--cart'><FaCartArrowDown/> Cart</button>
      <button className='navber--seller'><CiShop/>Seller</button>
      <button className='navber--threedot'><BsThreeDotsVertical /></button>
      </span>
    </div>
  )
}

export default Navbar