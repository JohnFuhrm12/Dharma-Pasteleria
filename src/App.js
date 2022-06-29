import './App.css';
import img1 from './pastry1.png';
import img2 from './pastry2.png';
import img3 from './pastry3.png';

import vegan from './vegan.png';

import cake1 from './torta1.png';
import cake2 from './torta2.png';
import tart1 from './tarta1.png';
import salty1 from './salado1.png';
import budin1 from './budin1.png';
import alfajores1 from './alfajores1.png';

import {useState, useEffect} from 'react';

function App() {

  useEffect(() => {
    const buttons = document.querySelectorAll("[data-carousel-button]")

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        const slides = button.closest("[data-carousel]").querySelector("[data-slides]")
    
        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset
        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0
    
        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active
        })
    });
  });

  return (
    <>
    <div className="page">
      <h1 className='titleBehindD'>D</h1>
      <h1 className='titleBehindP'>P</h1>
      <div className='titleBar'>
        <div className='leftBarBox'>
          <h2 className='leftBar'>Pasteles Especiales Para Celiacos y Veganos</h2>
          <img src={vegan} className="vegan" alt="Vegano"/>
        </div>
        <h1 className='title'>Dharma Pastelería</h1>
        <input className='searchBar' type="text" placeholder="Buscar ..."></input>
      </div>
      <h2 className='subtitle'>Buenos Aires</h2>
      <div className='categories-box'>
        <div className='categories'>
          <h2>TORTAS</h2>
          <h2>TARTAS</h2>
          <h2>SALADO</h2>
          <h2>BUDINES</h2>
          <h2>OTROS</h2>
        </div>
        <div className='carouselBlock'>
          <div className="carousel" data-carousel>
              <button className="prev" data-carousel-button="prev">&#8249;</button>
              <button className="next" data-carousel-button="next">&#8250;</button>
              <ul data-slides>
                  <li className="slide" data-active><img src={img1} className="home-image" alt="Pastel"/></li>
                  <li className="slide"><img src={img2} className="home-image" alt="Pastel"/></li>
                  <li className="slide"><img src={img3} className="home-image" alt="Pastel"/></li>
              </ul>
          </div>
        </div>
        <div className='selectionTitle'>
          <h1 className='selectionTitleBehind'>Descubre</h1>
          <h1>La Selección Dharma</h1>
        </div>
        <div className='selectionChoicesTop'>
          <div>
            <img src={cake2} className="selectionIMG" alt="Selección-Tortas"/>
            <h1 className='selectionName'>TORTAS</h1>
          </div>
          <div>
            <img src={tart1} className="selectionIMG" alt="Selección-Tartas"/>
            <h1 className='selectionName'>TARTAS</h1>
          </div>
          <div>
            <img src={salty1} className="selectionIMG" alt="Selección-Salado"/>
            <h1 className='selectionName'>SALADO</h1>
          </div>
        </div>
        <div className='selectionChoicesBottom'>
          <div>
            <img src={budin1} className="selectionIMG" alt="Selección-Budines"/>
            <h1 className='selectionName'>BUDINES</h1>
          </div>
          <div>
            <img src={alfajores1} className="selectionIMG" alt="Selección-Otros"/>
            <h1 className='selectionName'>OTROS</h1>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
