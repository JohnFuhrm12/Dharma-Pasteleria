import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 

import {useState, useEffect} from 'react';

function Tartas( {setTartasScreen, setHome, setCakesScreen} ) {

    function returnHome() {
        setTartasScreen(false);
        setHome(true);
      };


    function showTortas() {
        setCakesScreen(true);
        setTartasScreen(false);
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
          <h2 onClick={showTortas}>TORTAS</h2>
          <h2>TARTAS</h2>
          <h2>SALADO</h2>
          <h2>BUDINES</h2>
          <h2>OTROS</h2>
        </div>
      </div>
      <h1>Tartas</h1>
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

export default Tartas;