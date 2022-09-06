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

function Tortas( {setHome, setCurrentSection, cartAmount, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, setProductScreen, setProductImage, setProductName, setProductPrice, setProductDesc, setCartScreen, getDbmessages} ) {

  const [tortasItems, setTortasItems] = useState([]);
  const [tortasItems2, setTortasItems2] = useState([]);
  const [tortasItems3, setTortasItems3] = useState([]);
  const tortasRef = collection(db, "tortas");

  const getTortas = async () => {
    const itemsRef = query(tortasRef, where('itemRow', '==', 1));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setTortasItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef2 = query(tortasRef, where('itemRow', '==', 2));
    const currentQuerySnapshot2 = await getDocs(itemsRef2);
    setTortasItems2(currentQuerySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef3 = query(tortasRef, where('itemRow', '==', 3));
    const currentQuerySnapshot3 = await getDocs(itemsRef3);
    setTortasItems3(currentQuerySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  useEffect(() => {
    getDbmessages();
    getTortas();
  }, []);

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

  function showCart() {
    setCartScreen(true);
    setCakesScreen(false);
  };

  function goToProduct(e) {
    setCakesScreen(false);
    setProductScreen(true);
    setCurrentSection('Tortas');
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
          <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
          <p className='cartQuantity'>{cartAmount}</p>
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
        {tortasItems.map((tortaItem) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tortaItem.itemIMG} className="sectionIMG" title={tortaItem.itemIMG} name={tortaItem.itemDesc} id={tortaItem.itemPrice} alt={tortaItem.itemName}/>
                    <h1 className='itemName'>{tortaItem.itemName}</h1>
                    <h1 className='itemPrice'>{tortaItem.itemPrice}</h1>
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {tortasItems2.map((tortaItem2) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tortaItem2.itemIMG} className="sectionIMG" title={tortaItem2.itemIMG} name={tortaItem2.itemDesc} id={tortaItem2.itemPrice} alt={tortaItem2.itemName}/>
                    <h1 className='itemName'>{tortaItem2.itemName}</h1>
                    <h1 className='itemPrice'>{tortaItem2.itemPrice}</h1>
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {tortasItems3.map((tortaItem3) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tortaItem3.itemIMG} className="sectionIMG" title={tortaItem3.itemIMG} name={tortaItem3.itemDesc} id={tortaItem3.itemPrice} alt={tortaItem3.itemName}/>
                    <h1 className='itemName'>{tortaItem3.itemName}</h1>
                    <h1 className='itemPrice'>{tortaItem3.itemPrice}</h1>
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

export default Tortas;
