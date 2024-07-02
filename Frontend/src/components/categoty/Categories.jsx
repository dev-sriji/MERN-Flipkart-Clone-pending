import React from 'react';
import Category from './Category'; 
import appliance from "../../assets/category/Appliances.jpg"
import electronics from "../../assets/category/Electronics.webp"
import fashion from "../../assets/category/Fashion.webp"
import grocery from "../../assets/category/Grocery.webp"
import home from "../../assets/category/Home&Furnitures.webp"
import mobiles from "../../assets/category/Mobiles.png"
import toys from "../../assets/category/Toys & Beauty.webp"
import travel from "../../assets/category/Travel.webp"
import twoWheelers from "../../assets/category/Two Wheelers.webp"

const Categories = () => {
  return (
    <div className='categories'>
      <Category name="Appliances" img={appliance} />
      <Category name="Electronics" img={electronics} />
      <Category name="Fashion" img={fashion} />
      <Category name="Grocery" img={grocery} />
      <Category name="Home & Furnitures" img={home} />
      <Category name="Mobiles" img={mobiles} />
      <Category name="Toys & Beauty" img={toys} />
      <Category name="Travel" img={travel} />
      <Category name="Two Wheelers" img={twoWheelers} />
    </div>
  );
};

export default Categories;