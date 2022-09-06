import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import budinesVeganos from './static/budinesVeganos.png';
import budinPera from './static/budindePeras.png';
import budinFrutosRojos from './static/budinFrutosRojos.png';

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

function Budines( {setHome, setCurrentSection, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, cartAmount, setProductScreen, setProductImage, setProductName, setProductPrice, setProductDesc, setCartScreen, getDbmessages} ) {

  const [budinesItems, setBudinesItems] = useState([]);
  const [budinesItems2, setBudinesItems2] = useState([]);
  const [budinesItems3, setBudinesItems3] = useState([]);
  const budinesRef = collection(db, "budines");

  const getBudines = async () => {
    const itemsRef = query(budinesRef, where('itemRow', '==', 1));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setBudinesItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef2 = query(budinesRef, where('itemRow', '==', 2));
    const currentQuerySnapshot2 = await getDocs(itemsRef2);
    setBudinesItems2(currentQuerySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef3 = query(budinesRef, where('itemRow', '==', 3));
    const currentQuerySnapshot3 = await getDocs(itemsRef3);
    setBudinesItems3(currentQuerySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  useEffect(() => {
    getDbmessages();
    getBudines();
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
        {budinesItems.map((budinItem) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={budinItem.itemIMG} className="sectionIMG" title={budinItem.itemIMG} name={budinItem.itemDesc} id={budinItem.itemPrice} alt={budinItem.itemName}/>
                    <h1 className='itemName'>{budinItem.itemName}</h1>
                    <h1 className='itemPrice'>{budinItem.itemPrice}</h1>
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {budinesItems2.map((budinItem2) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={budinItem2.itemIMG} className="sectionIMG" title={budinItem2.itemIMG} name={budinItem2.itemDesc} id={budinItem2.itemPrice} alt={budinItem2.itemName}/>
                    <h1 className='itemName'>{budinItem2.itemName}</h1>
                    <h1 className='itemPrice'>{budinItem2.itemPrice}</h1>
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {budinesItems3.map((budinItem3) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={budinItem3.itemIMG} className="sectionIMG" title={budinItem3.itemIMG} name={budinItem3.itemDesc} id={budinItem3.itemPrice} alt={budinItem3.itemName}/>
                    <h1 className='itemName'>{budinItem3.itemName}</h1>
                    <h1 className='itemPrice'>{budinItem3.itemPrice}</h1>
                  </div>
          )
        })}
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