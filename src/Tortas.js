import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import cake1 from './static/torta1.png';
import cake2 from './static/torta2.png';
import Praline from './static/tortaPraline.png';
import FrutosRojos from './static/tortaFrutosRojos.png';
import Vegana from './static/tortaVegana.png';
import Nuez from './static/tortaNuez.png';
import Oreo from './static/tortaOreo.png';

import {useState, useEffect} from 'react';

function Tortas( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, setProductScreen, setProductImage, setProductName, setProductPrice, setProductDesc} ) {

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

  function goToProduct(e) {
    setCakesScreen(false);
    setProductScreen(true);
    setProductImage(e.currentTarget.title);
    setProductName(e.currentTarget.alt);
    setProductPrice(e.currentTarget.id);
    setProductDesc(e.currentTarget.name);
    //console.log(e.currentTarget);
    //console.log(e.currentTarget.innerHTML);
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
            <img onClick={goToProduct} src={Praline} className="sectionIMG" title={Praline} name="Una torta que dispone de un bizcocho de vainilla, rellena con dulce de lecha y praline. Cubierta con ganache de chocolate amargo y con más praline." id="$2.500" alt="Torta Praline"/>
            <h1 className='itemName'>Torta Praline</h1>
            <h1 className='itemPrice'>$2.500</h1>
          </div>
          <div>
            <img onClick={goToProduct} src={FrutosRojos} className="sectionIMG" title={FrutosRojos} name="Bizcocho de queso mascarpone y frutos rojos, rellena de una crema de queso mascarpone, cubierta con el mismo relleno y frutos rojos." id="$3.500" alt="Torta Frutos Rojos"/>
            <h1 className='itemName'>Torta Frutos Rojos</h1>
            <h1 className='itemPrice'>$3.500</h1>
          </div>
          <div>
            <img onClick={goToProduct} src={Vegana} className="sectionIMG" title={Vegana} name="Bizcocho de cacao, rellena de dulce de leche de almendras, cubierta con crema, choco rallado y frutillas." id="$3.000" alt="Torta Vegana"/>
            <h1 className='itemName'>Torta Vegana</h1>
            <h1 className='itemPrice'>$3.000</h1>
          </div>
        </div>
        <div className='sectionImagesBottom'>
          <div>
            <img onClick={goToProduct} src={Nuez} className="sectionIMG" title={Nuez} name="Bizcocho de vainilla y nueces, rellena con una ganache de choco amargo, cubierto con dulce de leche y nueces bañadas." id="$2.700" alt="Torta Nuez"/>
            <h1 className='itemName'>Torta Nuez</h1>
            <h1 className='itemPrice'>$2.700</h1>
          </div>
          <div>
            <img onClick={goToProduct} src={Oreo} className="sectionIMG" title={Oreo} name="Bizcocho de cacao y oreos, rellena de dulce de leche. Cubierta con crema chantilly, choco blanco y mini oreos." id="$2.550" alt="Torta Oreo"/>
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
