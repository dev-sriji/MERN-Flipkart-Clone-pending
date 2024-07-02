import React from 'react'
import Navbar from '../../components/Navbar'
import Categories from '../../components/categoty/Categories'
import SlideShow from '../../components/SlideShow/SlideShow'
import TopDeals from '../../components/TopDeals/TopDeals'
import gown from '../../assets/types/cloth1.jpg'
import kurta from '../../assets/types/cloth2.png'
import iqoo3 from '../../assets/types/iqoo3.webp'
import iphone from "../../assets/types/iphone.webp"
import pocom6 from "../../assets/types/poco m6.webp"
import rog from "../../assets/types/rog2.webp"
import vivot2 from "../../assets/types/vivo t2pro.webp"
import dress1 from "../../assets/types/dress3.webp"
import dress2 from "../../assets/types/dress4.webp"
import dress3 from "../../assets/types/dress5.webp"
import dress4 from "../../assets/types/dress6.webp"
import FooterLite from '../../components/Footer/FooterLite'
import FlipkartContent from '../../components/Footer/FooterLite'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  
  const products = [
    { id: 1, name: "gown", img: gown, category: "Fashion", price: 100 },
    { id: 2, name: "kurta", img: kurta, category: "Fashion", price: 50 },
    { id: 3, name: "IQOO 3", img: iqoo3, category: "Smartphones", price: 500 },
    { id: 4, name: "iphone", img: iphone, category: "Smartphones", price: 400 },
{id: 1,name: "Dress", img: dress1, category: "Fashion"},
{id: 1,name: "Brown Dress", img: dress2, category: "Fashion"},
{id: 1,name: "Red Dress", img: dress3, category: "Fashion"},
{id: 1,name: "dress", img: dress4, category: "Fashion"},
{id: 1,name: "POCO M6 Pro 5G", img: pocom6, category: "Smartphones"},
{id: 1,name: "Asus ROG 6", img: rog, category: "Smartphones"},
{id: 1,name: "vivo T2 Pro", img: vivot2, category: "Smartphones"},
  ];
  
  const categories = ["Fashion", "Smartphones"];

  
  return (
    <div className='home'>
        <Navbar />
        <div className='pagee'>
        <Categories />
        <SlideShow />
        <TopDeals products={products} categories={categories} />
        </div>
        <FooterLite />
        <Footer />
    </div>
  )
}

export default Home