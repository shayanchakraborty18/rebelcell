import React,  { useState } from 'react';
import {Link} from 'react-router-dom';

import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function HomeSlider() {
  const [sliderRef, setSliderRef] = useState(null)

  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    speed: 1100,
    autoplay: true,
    infinite: true,
		accessibility: false,
    responsive: [{ 
    breakpoint:768,
    settings: {arrows: false, 
    } 
    },{ breakpoint: 485, settings: {arrows: false,
    }}]
  }

  const slidersItems = [
    {
      imageSrc: '/images/project_slider01.jpg',
      title: 'Powerful and Durable.',
      secondTitle: 'But <span> Lightweight.</span>',
      description: 'The perfect solution to all your Angler Fishing Energy needs.'
    },
    {
      imageSrc: '/images/project_slider02.jpg',
      title: 'Powerful and Durable.',
      secondTitle: 'But <span> Lightweight.</span>',
      description: 'The perfect solution to all your Angler Fishing Energy needs.'
    },
    {
      imageSrc: '/images/project_slider03.jpg',
      title: 'Powerful and Durable.',
      secondTitle: 'But <span> Lightweight.</span>',
      description: 'The perfect solution to all your Angler Fishing Energy needs.'
    },
    {
      imageSrc: '/images/project_slider04.jpg',
      title: 'Powerful and Durable.',
      secondTitle: 'But <span> Lightweight.</span>',
      description: 'The perfect solution to all your Angler Fishing Energy needs.'
    }
  ];
  return (
    <div id="myCarousel" className="project_page">
  
        <div className="project_slide">
          <div className="project_description_slide">
            <div className="slider project-slider-for">
              <Slider ref={setSliderRef} {...sliderSettings}>
                {slidersItems.map((card, index) => (
                  <div key={index} className="commercial_sec">
                    <img src={card.imageSrc} alt="" />
                      <div className="container">
                        <div className="project_slide_txt">
                          <div className="project_description_inner">
                            <h2>{card.title}</h2>
                            <h1 dangerouslySetInnerHTML={{__html: card.secondTitle}}></h1>
                            <p>{card.description}</p>
                            <Link to="/shop" className="ban-btn">start SHopping Now</Link>
                          </div>
                        </div>
                    </div>
                  </div>
                ))}
              </Slider> 
            </div>
          </div>
        </div>
      </div>
  )
}

export default HomeSlider