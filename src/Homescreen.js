import './App.css';
import img1 from './static/pastry1.png';
import img2 from './static/pastry2.png';
import img3 from './static/pastry3.png';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 

import cake1 from './static/torta1.png';
import cake2 from './static/torta2.png';
import tart1 from './static/tarta1.png';
import salty1 from './static/salado1.png';
import budin1 from './static/budin1.png';
import alfajores1 from './static/alfajores1.png';

import cart from './static/cart.png';
import search from './static/search.png';

import {useState, useEffect} from 'react';

function Homescreen( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, setCartScreen, cartAmount}) {
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

  function showCakes() {
    setCakesScreen(true);
    setHome(false);
  };

  function showTartas() {
    setTartasScreen(true);
    setHome(false);
  };

  function showSalado() {
    setSaladoScreen(true);
    setHome(false);
  };

  function showBudines() {
    setBudinesScreen(true);
    setHome(false);
  };

  function showOtros() {
    setOtrosScreen(true);
    setHome(false);
  };

  function showCart() {
    setCartScreen(true);
    setHome(false);
  };

  function refresh() {
    window.location.reload(false);
  };

  return (
    <>
    <div className="page">
      <h1 onClick={refresh} className='titleBehindD'>D</h1>
      <h1 onClick={refresh} className='titleBehindP'>P</h1>
      <div className='titleBar'>
        <div className='leftBarBox'>
          <h2 className='leftBar'>Pasteles Especiales Para Celiacos y Veganos</h2>
          <img src={vegan} className="vegan" alt="Vegano"/>
        </div>
        <h1 onClick={refresh} className='title'>Dharma Pastelería</h1>
        <div className='searchCart'>
          <img src={search} className="search" alt="Buscar"/>
          <input className='searchBar' type="text" placeholder="Buscar ..."></input>
          <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
          <p className='cartQuantity'>{cartAmount}</p>
        </div>
      </div>
      <h2 onClick={refresh} className='subtitle'>Buenos Aires</h2>
      <div className='categories-box'>
        <div className='categories'>
          <h2 onClick={showCakes}>TORTAS</h2>
          <h2 onClick={showTartas}>TARTAS</h2>
          <h2 onClick={showSalado}>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
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
            <img onClick={showCakes} src={cake2} className="selectionIMG" alt="Selección-Tortas"/>
            <h1  onClick={showCakes} className='selectionName'>LAS TORTAS</h1>
          </div>
          <div>
            <img onClick={showTartas} src={tart1} className="selectionIMG" alt="Selección-Tartas"/>
            <h1 onClick={showTartas} className='selectionName'>LAS TARTAS</h1>
          </div>
          <div>
            <img onClick={showSalado} src={salty1} className="selectionIMG" alt="Selección-Salado"/>
            <h1 onClick={showSalado} className='selectionName'>LO SALADO</h1>
          </div>
        </div>
        <div className='selectionChoicesBottom'>
          <div>
            <img onClick={showBudines} src={budin1} className="selectionIMG" alt="Selección-Budines"/>
            <h1 onClick={showBudines} className='selectionName'>LOS BUDINES</h1>
          </div>
          <div>
            <img onClick={showOtros} src={alfajores1} className="selectionIMG" alt="Selección-Otros"/>
            <h1 onClick={showOtros} className='selectionName'>LOS OTROS</h1>
          </div>
        </div>
        <div className='whereFindSection'>
          <div className='whereFindTitles'>
            <h1 className='whereFindTitleBehind'>La Tienda</h1>
            <h1 className='whereFindTitle'>¿Donde Encontrarnos?</h1>
          </div>
          <div className='whereFindParagraphs'>
            <p>Operamos desde casa adentro de la provincia de Buenos Aires. El punto de retiro es Caseros. La Dirección:</p>
            <p>Dr. Amadeo Sabattini 4545, B1678 Caseros, Provincia de Buenos Aires, Argentina</p>
          </div>
          <div className='whereFindParagraphs2'>
            <p>Todos los pedidos encargados serán retirados o enviados a domicilio despues de 24 horas realizada la compra. Contactanos a través de Whatsapp para coordinar las entregas.</p>
          </div>
        </div>
        <div className='footer'>
          <h1>Dharma Pastelería</h1>
          <div className='footerInsta'>
            <h1>Seguinos en Instagram:</h1>
            <a href='https://www.instagram.com/dharma.pasteleria/'><img src={instagram} className="instagram" alt="Instagram"/></a>
          </div>
        </div>
    </div>
    </>
  );
}

export default Homescreen;