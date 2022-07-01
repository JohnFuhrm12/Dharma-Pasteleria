import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import {useState, useEffect} from 'react';

function Otros( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen} ) {

  function returnHome() {
    setOtrosScreen(false);
    setHome(true);
  };

  function showCakes() {
    setOtrosScreen(false);
    setCakesScreen(true);
  };

  function showTartas() {
    setOtrosScreen(false);
    setTartasScreen(true);
  };

  function showSalado() {
    setOtrosScreen(false);
    setSaladoScreen(true);
  };

  function showBudines() {
    setOtrosScreen(false);
    setBudinesScreen(true);
  };


  return (
    <>
    <div className="page">
    <h1 onClick={returnHome} className='titleBehindD'>D</h1>
      <h1 onClick={returnHome} className='titleBehindP'>P</h1>
      <div className='titleBar'>
        <div className='leftBarBox'>
          <h2 className='leftBar'>Pasteles Especiales Para Celiacos y Veganos</h2>
          <img src={vegan} className="vegan" alt="Vegano"/>
        </div>
        <h1 onClick={returnHome} className='title'>Dharma Pastelería</h1>
        <div className='searchCart'>
          <img src={search} className="search" alt="Buscar"/>
          <input className='searchBar' type="text" placeholder="Buscar ..."></input>
          <img src={cart} className="cart" alt="Carrito"/>
          <p className='cartQuantity'>0</p>
        </div>
      </div>
      <h2 onClick={returnHome} className='subtitle'>Buenos Aires</h2>
      <div className='categories-box'>
        <div className='categories'>
          <h2 onClick={showCakes}>TORTAS</h2>
          <h2 onClick={showTartas}>TARTAS</h2>
          <h2 onClick={showSalado}>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2>OTROS</h2>
        </div>
      </div>
      <h1>Otros</h1>
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

export default Otros;