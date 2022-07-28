import React,  { useState } from 'react';

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
    },
    {
      imageSrc: '/images/project_slider05.jpg',
      title: 'Powerful and Durable.',
      secondTitle: 'But <span> Lightweight.</span>',
      description: 'The perfect solution to all your Angler Fishing Energy needs.'
    }
  ]
  return (
    <div id="myCarousel" class="project_page">
  
        <div class="project_slide">
          <div class="project_description_slide">
            <div class="slider project-slider-for">
              <Slider ref={setSliderRef} {...sliderSettings}>
                {slidersItems.map((card, index) => (
                  <div key={index} class="commercial_sec">
                    <img src={card.imageSrc} alt="" />
                      <div class="container">
                        <div class="project_slide_txt">
                          <div class="project_description_inner">
                            <h2>{card.title}</h2>
                            <h1 dangerouslySetInnerHTML={{__html: card.secondTitle}}></h1>
                            <p>{card.description}</p>
                            <a href="" class="ban-btn">start SHopping Now</a>
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