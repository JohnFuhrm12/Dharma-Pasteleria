import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import Praline from './static/tortaPraline.png';
import FrutosRojos from './static/tortaFrutosRojos.png';
import Vegana from './static/tortaVegana.png';
import Nuez from './static/tortaNuez.png';
import Oreo from './static/tortaOreo.png';

import {useState, useEffect} from 'react';

function Product( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, productDesc, setProductScreen, productImage, setProductImage, productName, productPrice} ) {

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    console.log('Image:', productImage);
    console.log('Name:', productName);
    console.log('Price:', productPrice);
  }, []);

  function returnHome() {
    setProductScreen(false);
    setHome(true);
  };

  function showCakes() {
    setProductScreen(false);
    setCakesScreen(true);
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

  function subtract() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    };
  };

  function add() {
    setQuantity(quantity + 1);
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
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Tortas</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>{productName}</h2>
      </div>
      <div className='productWrapper'>
        <div className='productImageSection'>
          <img src={productImage} className="productIMG" alt="Foto de Producto"/>
        </div>
        <div className='productDescSection'>
          <h1 className='sectionTitle'>{productName}</h1>
          <h1 className='itemName'>{productName}</h1>
          <h1 className='itemPrice'>{productPrice}</h1>
          <p className='itemDesc'>{productDesc}</p>
          <div className='addSubtCart'>
            <button className='subtButton' onClick={subtract}>-</button>
            <h1 className='quantity'>{quantity}</h1>
            <button className='addButton' onClick={add}>+</button>
            <button className='addCartButton'>Agregar al Carrito</button>
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

export default Product;