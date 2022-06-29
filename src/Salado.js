import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 

import {useState, useEffect} from 'react';

function Salado( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen} ) {

  function returnHome() {
    setSaladoScreen(false);
    setHome(true);
  };

  function showCakes() {
    setSaladoScreen(false);
    setCakesScreen(true);
  };

  function showTartas() {
    setSaladoScreen(false);
    setTartasScreen(true);
  };

  function showBudines() {
    setSaladoScreen(false);
    setBudinesScreen(true);
  };

  function showOtros() {
    setSaladoScreen(false);
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
          <h2 onClick={showCakes}>TORTAS</h2>
          <h2 onClick={showTartas}>TARTAS</h2>
          <h2>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <h1>Salado</h1>
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

export default Salado;