import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import slide1 from "../../assets/slideshow/slide1.webp"
import slide2 from "../../assets/slideshow/slide2.webp"
import slide3 from "../../assets/slideshow/slide3.webp"
import slide4 from "../../assets/slideshow/slide4.webp"
import slide5 from "../../assets/slideshow/slide5.webp"


const SlideShow = () => {
    const images = [
        slide1,
        slide2,
        slide3,
        slide4,
        slide5
    ];

    return (
        <Slide className='slide' duration={2500} transitionDuration={500}>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[0]})` }}>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[1]})` }}>
                </div>
            </div>
            <div className="each-slide-effect">
                <div style={{ 'backgroundImage': `url(${images[2]})` }}>
                </div>
            </div>
        </Slide>
    );
};

export default SlideShow;