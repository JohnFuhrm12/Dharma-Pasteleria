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

import miniTarteletas from './static/miniTarteletas.png';

import {useState, useEffect} from 'react';

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

// Initialize Firebase Database
firebase.initializeApp({
  apiKey: "AIzaSyAWkqnRPfh3R2WIesSODdKFns4ymZridvM",
  authDomain: "dharma-ec35e.firebaseapp.com",
  projectId: "dharma-ec35e",
  storageBucket: "dharma-ec35e.appspot.com",
  messagingSenderId: "79111090409",
  appId: "1:79111090409:web:b41568c2860577b3844078"
});

// Firebase Database
const db = firebase.firestore();

function Product( {...props} ) {
  
  const [searchKey, setSearchKey] = useState('');

  const [currentQuantity, setCurrentQuantity] = useState(0);
  const cartRef = db.collection('cart');

  const [quantity, setQuantity] = useState(0);

  const price = Number(props.productPrice.replace('$','').replace('.',''));
  const image = props.productName.replace(' ','').replace(' ','');
  const Newimage = image.charAt(0).toLowerCase() + image.slice(1)

  function returnHome() {
    props.setProductScreen(false);
    props.setHome(true);
  };

  function showCakes() {
    props.setProductScreen(false);
    props.setCakesScreen(true);
  };

  function showTartas() {
    props.setProductScreen(false);
    props.setTartasScreen(true);
  };

  function showSalado() {
    props.setProductScreen(false);
    props.setSaladoScreen(true);
  };

  function showBudines() {
    props.setProductScreen(false);
    props.setBudinesScreen(true);
  };

  function showOtros() {
    props.setProductScreen(false);
    props.setOtrosScreen(true);
  };

  function showCart() {
    props.setCartScreen(true);
    props.setProductScreen(false);
  };

  function subtract() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    };
  };

  function add() {
    setQuantity(quantity + 1);
  };

  const addToCart = async (e) => {
    e.preventDefault();
    await cartRef.add({
      itemIMG: props.productImage,
      itemName: props.productName,
      itemPrice: price,
      itemQuantity: quantity,
      user: props.currentUser,
    });
    props.getDbmessages();
    showCart();
  };

  // Grab user input
  function handleChange(e) {
    setCurrentQuantity(e.target.value);
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
      props.setSearchQuery(searchKey);
      props.setSearchScreen(true);
      props.setProductScreen(false);
    };
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
          <input onChange={(e) => {setSearchKey(e.target.value)}} onKeyDown={(e) => {searchFunc(e)}} className='searchBar' type="text" value={searchKey} placeholder="Buscar ..."></input>
          <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
          <p className='cartQuantity'>{props.cartAmount}</p>
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
        <h2 className='sectionHeading'>{props.currentSection}</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>{props.productName}</h2>
      </div>
      <div className='productWrapper'>
        <div className='productImageSection'>
          <img src={props.productImage} className="productIMG" alt="Foto de Producto"/>
        </div>
        <div className='productDescSection'>
          <h1 className='sectionTitle'>{props.productName}</h1>
          <h1 className='itemName'>{props.productName}</h1>
          <h1 className='itemPrice'>{props.productPrice}</h1>
          <p className='itemDesc'>{props.productDesc}</p>
          <div className='addSubtCart'>
            <button className='subtButton' onClick={subtract}>-</button>
            <h1 className='quantity'>{quantity}</h1>
            <button className='addButton' onClick={add}>+</button>
            <button onClick={addToCart} className='addCartButton'>Agregar al Carrito</button>
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