import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Categories from '../../components/categoty/Categories'
import SlideShow from '../../components/SlideShow/SlideShow'
import TopDeals from '../../components/TopDeals/TopDeals'
import FooterLite from '../../components/Footer/FooterLite'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  const api = "localhost:3000"
  const [category,setCategory] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cat = await (await fetch("http://localhost:3000/api/category/list/")).json()
        setCategory(cat)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProducts()
  }, [])



  return (
    <div className='home'>
      <Navbar />
      <div className='pagee'>
        <Categories />
        <SlideShow />
        {category.map((cat,index)=>{
          return <TopDeals key={index} category={cat} />
        })}
      </div>
      <FooterLite />
      <Footer />
    </div>
  )
}

export default Home