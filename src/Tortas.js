import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 

import cake1 from './static/torta1.png';
import cake2 from './static/torta2.png';
import Praline from './static/tortaPraline.png';
import FrutosRojos from './static/tortaFrutosRojos.png';
import Vegana from './static/tortaVegana.png';
import Nuez from './static/tortaNuez.png';
import Oreo from './static/tortaOreo.png';

import {useState, useEffect} from 'react';

function Tortas( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen} ) {

  function returnHome() {
    setCakesScreen(false);
    setHome(true);
  };

  function showTartas() {
    setCakesScreen(false);
    setTartasScreen(true);
  };

  function showSalado() {
    setCakesScreen(false);
    setSaladoScreen(true);
  };

  function showBudines() {
    setCakesScreen(false);
    setBudinesScreen(true);
  };

  function showOtros() {
    setCakesScreen(false);
    setOtrosScreen(true);
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
        <input className='searchBar' type="text" placeholder="Buscar ..."></input>
      </div>
      <h2 onClick={returnHome} className='subtitle'>Buenos Aires</h2>
      <div className='categories-box'>
        <div className='categories'>
          <h2>TORTAS</h2>
          <h2 onClick={showTartas}>TARTAS</h2>
          <h2 onClick={showSalado}>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Tortas</h2>
      </div>
      <h1 className='sectionTitle'>LAS TORTAS</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
          <div>
            <img src={Praline} className="sectionIMG" alt="Praline"/>
            <h1 className='itemName'>Torta Praline</h1>
            <h1 className='itemPrice'>$2.500</h1>
          </div>
          <div>
            <img src={FrutosRojos} className="sectionIMG" alt="Frutos Rojos"/>
            <h1 className='itemName'>Torta Frutos Rojos</h1>
            <h1 className='itemPrice'>$3.500</h1>
          </div>
          <div>
            <img src={Vegana} className="sectionIMG" alt="Vegana"/>
            <h1 className='itemName'>Torta Vegana</h1>
            <h1 className='itemPrice'>$3.000</h1>
          </div>
        </div>
        <div className='sectionImagesBottom'>
          <div>
            <img src={Nuez} className="sectionIMG" alt="Nuez"/>
            <h1 className='itemName'>Torta Nuez</h1>
            <h1 className='itemPrice'>$2.700</h1>
          </div>
          <div>
            <img src={Oreo} className="sectionIMG" alt="Oreo"/>
            <h1 className='itemName'>Torta Oreo</h1>
            <h1 className='itemPrice'>$2.550</h1>
          </div>
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

export default Tortas;
