import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import budinesVeganos from './static/budinesVeganos.png';
import budinPera from './static/budindePeras.png';
import budinFrutosRojos from './static/budinFrutosRojos.png';

import {useState, useEffect} from 'react';

function Budines( {setHome, setCurrentSection, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, cartAmount, setProductScreen, setProductImage, setProductName, setProductPrice, setProductDesc, setCartScreen, getDbmessages} ) {

  useEffect(() => {
    getDbmessages();
  }, []);

  function returnHome() {
    setBudinesScreen(false);
    setHome(true);
  };

  function showTartas() {
    setBudinesScreen(false);
    setTartasScreen(true);
  };

  function showCakes() {
    setBudinesScreen(false);
    setCakesScreen(true);
  };

  function showSalado() {
    setBudinesScreen(false);
    setSaladoScreen(true);
  };

  function showOtros() {
    setBudinesScreen(false);
    setOtrosScreen(true);
  };

  function goToProduct(e) {
    setBudinesScreen(false);
    setProductScreen(true);
    setCurrentSection('Budines');
    setProductImage(e.currentTarget.title);
    setProductName(e.currentTarget.alt);
    setProductPrice(e.currentTarget.id);
    setProductDesc(e.currentTarget.name);
  };

  function showCart() {
    setCartScreen(true);
    setBudinesScreen(false);
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
          <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
          <p className='cartQuantity'>{cartAmount}</p>
        </div>
      </div>
      <h2 onClick={returnHome} className='subtitle'>Buenos Aires</h2>
      <div className='categories-box'>
        <div className='categories'>
          <h2 onClick={showCakes}>TORTAS</h2>
          <h2 onClick={showTartas}>TARTAS</h2>
          <h2 onClick={showSalado}>SALADO</h2>
          <h2>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Budines</h2>
      </div>
      <h1 className='sectionTitle'>Los Budines</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
          <div>
            <img onClick={goToProduct} src={budinesVeganos} className="sectionIMG" title={budinesVeganos} name="Budin vegano grande, rinde 12 porciones." id="$950" alt="Budines Veganos"/>
            <h1 className='itemName'>Budines Veganos</h1>
            <h1 className='itemPrice'>$950</h1>
          </div>
          <div>
            <img onClick={goToProduct} src={budinPera} className="sectionIMG" title={budinPera} name="Budin de vainilla y peras, cubierto con salsa de caramelo, peras asadas y chocolate blanco." id="$700" alt="Budin de Pera"/>
            <h1 className='itemName'>Budin de Pera</h1>
            <h1 className='itemPrice'>$700</h1>
          </div>
          <div>
            <img onClick={goToProduct} src={budinFrutosRojos} className="sectionIMG" title={budinFrutosRojos} name="Budin de vainilla y queso mascarpone, cubierto con crema y frutos rojos." id="$900" alt="Budin Frutos Rojos"/>
            <h1 className='itemName'>Budin Frutos Rojos</h1>
            <h1 className='itemPrice'>$900</h1>
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

export default Budines;