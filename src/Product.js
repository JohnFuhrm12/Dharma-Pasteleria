import './App.css';
import {useState, useEffect} from 'react';

import cart from './static/cart.png';
import search from './static/search.png';

import coralHome from './static/coralHome.jpg';

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";
import userEvent from '@testing-library/user-event';

// Initialize Firebase Database
firebase.initializeApp({
  apiKey: "AIzaSyB5aeD3R-qHoRlLJcNGmrpCVZEocRz90Dk",
  authDomain: "reef-store-9da21.firebaseapp.com",
  projectId: "reef-store-9da21",
  storageBucket: "reef-store-9da21.appspot.com",
  messagingSenderId: "149895470839",
  appId: "1:149895470839:web:5937a7595ca8b696f17df2"
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

  function subtract() {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    };
  };

  function add() {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    console.log(props.currentUser);
  });

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

  function showCart() {
    props.setCartScreen(true);
    props.setProductScreen(false);
  };

  function showProductSelection(e) {
    props.setProductScreen(false);
    props.setProductSelectionCategory(e.currentTarget.title);
    props.setProductSelectionScreen(true);
};

function showCart() {
  props.setCartScreen(true);
  props.setProductScreen(false);
};

  return (
    <>
    <div className="page">
    <div className='titleBar'>
            <h1 className='titleName' onClick={returnHome} >JF Aquatics</h1>
            <h1 onClick={showProductSelection} title="Soft Corals" className='catName'>Corals</h1>
            <h1 onClick={showProductSelection} title="Supplies" className='catName'>Supplies</h1>
            <h1 onClick={showProductSelection} title="Saltwater Fish" className='catName'>Fish</h1>
            <h1 onClick={showProductSelection} title="Invertebrates" className='catName'>Inverts</h1>
          <div className='searchCart'>
            <img src={search} className="search" alt="Search"/>
            <input onChange={(e) => {setSearchKey(e.target.value)}} onKeyDown={(e) => {searchFunc(e)}} className='searchBar' type="text" value={searchKey} placeholder="Search ..."/>
            <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
            <p className='cartQuantity'>{props.cartAmount}</p>
          </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Home</h2>
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
      <svg className='bottomWave2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
                <path fill="#092849" fill-opacity="1" d="M0,96L34.3,90.7C68.6,85,137,75,206,85.3C274.3,96,343,128,411,138.7C480,149,549,139,617,117.3C685.7,96,754,64,823,58.7C891.4,53,960,75,1029,96C1097.1,117,1166,139,1234,144C1302.9,149,1371,139,1406,133.3L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"/>
            </svg>
    </div>
    </>
  );
}

export default Product;