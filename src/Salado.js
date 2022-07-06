import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import scons from './static/scons.png';

import {useState, useEffect} from 'react';

function Salado( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, cartAmount, setProductScreen, setProductImage, setProductName, setProductPrice, setProductDesc, setCartScreen} ) {

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

  function goToProduct(e) {
    setSaladoScreen(false);
    setProductScreen(true);
    setProductImage(e.currentTarget.title);
    setProductName(e.currentTarget.alt);
    setProductPrice(e.currentTarget.id);
    setProductDesc(e.currentTarget.name);
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
          <p className='cartQuantity'>{cartAmount}</p>
        </div>
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
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Salado</h2>
      </div>
      <h1 className='sectionTitle'>Lo Salado</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
          <div>
            <img onClick={goToProduct} src={scons} className="sectionIMG" title={scons} name="Masa de cuatro quesos (opcional pedir con tomate), vienen en caja de 10 unidades." id="$1.400" alt="Scons"/>
            <h1 className='itemName'>Scons</h1>
            <h1 className='itemPrice'>$1.400</h1>
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

export default Salado;