import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import {useState, useEffect} from 'react';

function ClientInfo( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, setClientInfoScreen} ) {

  function returnHome() {
    setClientInfoScreen(false);
    setHome(true);
  };

  function showCakes() {
    setClientInfoScreen(false);
    setCakesScreen(true);
  };

  function showTartas() {
    setClientInfoScreen(false);
    setTartasScreen(true);
  };

  function showSalado() {
    setClientInfoScreen(false);
    setSaladoScreen(true);
  };

  function showBudines() {
    setClientInfoScreen(false);
    setBudinesScreen(true);
  };

  function showOtros() {
    setClientInfoScreen(false);
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
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <h1>Datos de Facturación</h1>
      <div className='clientInfoBox'>
        <div className='firstInfoColumn'>
            <label className='clientInfoLabel' for="Name">Nombre:</label>
            <input className='clientInfoInput' name='Name' required></input>
            <label className='clientInfoLabel' for="Business">Empresa:</label>
            <input className='clientInfoInput' name='Business'></input>
            <label className='clientInfoLabel' for="Street">Calle:</label>
            <input className='clientInfoInput' name='Street'></input>
            <label className='clientInfoLabel' for="PostalCode">Código Postal:</label>
            <input className='clientInfoInput' name='PostalCode'></input>
            <label className='clientInfoLabel' for="Phone">Teléfono:</label>
            <input className='clientInfoInput' name='Phone'></input>
        </div>
        <div className='secondInfoColumn'>
            <label className='clientInfoLabel' for="LastName">Apellido:</label>
            <input className='clientInfoInput' name='LastName'></input>
            <label className='clientInfoLabel' for="Country">País:</label>
            <input className='clientInfoInput' name='Country' value={'Argentina'}></input>       
            <label className='clientInfoLabel' for="Building">Apartamento/Unidad:</label>
            <input className='clientInfoInput' name='Building'></input>    
            <label className='clientInfoLabel' for="City">Ciudad:</label>
            <input className='clientInfoInput' name='City'></input>  
            <label className='clientInfoLabel' for="Email">Correo:</label>
            <input className='clientInfoInput' name='Email'></input>             
        </div>
      </div>
      <button>Seguir</button>
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

export default ClientInfo;