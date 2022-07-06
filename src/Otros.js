import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import alfajores from './static/alfajores.png';
import cakePaletas from './static/cakePaletas.png';
import rolls from './static/rolls.png';
import trufas from './static/trufas.png';
import donas from './static/donas.png';

import {useState, useEffect} from 'react';

function Otros( {setHome, setCurrentSection, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, cartAmount, setProductScreen, setProductImage, setProductName, setProductPrice, setProductDesc, setCartScreen} ) {

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

  function goToProduct(e) {
    setOtrosScreen(false);
    setProductScreen(true);
    setCurrentSection('Otros');
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
          <h2 onClick={showSalado}>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Otros</h2>
      </div>
      <h1 className='sectionTitle'>Los Otros</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
          <div>
            <img onClick={goToProduct} src={alfajores} className="sectionIMG" title={alfajores} name="Masa sablee, rellenos con dulce de leche, viene en caja de 4 unidades." id="$600" alt="Alfajores"/>
            <h1 className='itemName'>Alfajores</h1>
            <h1 className='itemPrice'>$600</h1>
          </div>
          <div>
            <img onClick={goToProduct} src={cakePaletas} className="sectionIMG" title={cakePaletas} name="Paletas de chocolate rellenas de un bizcocho humedo, viene en cajitas de 3 unidades." id="$1000" alt="Cake Paletas"/>
            <h1 className='itemName'>Cake Paletas</h1>
            <h1 className='itemPrice'>$1.000</h1>
          </div>
          <div>
            <img onClick={goToProduct} src={rolls} className="sectionIMG" title={rolls} name="Rolls rellenos de nutella, viene en bandeja de 6 unidades." id="$1200" alt="Rolls"/>
            <h1 className='itemName'>Rolls</h1>
            <h1 className='itemPrice'>$1.200</h1>
          </div>
        </div>
        <div className='sectionImagesBottom'>
          <div>
            <img onClick={goToProduct} src={trufas} className="sectionIMG" title={trufas} name="Seleccion de lo que haya disponible en el momento, viene en bolsas de 10 unidades." id="$300" alt="Trufas"/>
            <h1 className='itemName'>Trufas</h1>
            <h1 className='itemPrice'>$300</h1>
          </div>
          <div>
            <img onClick={goToProduct} src={donas} className="sectionIMG" title={donas} name="Bañadas en chocolate y rellenas de dulce de leche, viene en caja de 3." id="$350" alt="Donas"/>
            <h1 className='itemName'>Donas</h1>
            <h1 className='itemPrice'>$350</h1>
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

export default Otros;