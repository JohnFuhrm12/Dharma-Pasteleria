import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import miniTarteletas from './static/miniTarteletas.png';
import Ricota from './static/tartadeRicota.png';

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

function Tartas( {setHome, setCurrentSection, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, cartAmount, setProductScreen, setProductImage, setProductName, setProductPrice, setProductDesc, setCartScreen, getDbmessages} ) {

  const [tartasItems, setTartasItems] = useState([]);
  const [tartasItems2, setTartasItems2] = useState([]);
  const [tartasItems3, setTartasItems3] = useState([]);
  const tartasRef = collection(db, "tartas");

  const getTartas = async () => {
    const itemsRef = query(tartasRef, where('itemRow', '==', 1));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setTartasItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef2 = query(tartasRef, where('itemRow', '==', 2));
    const currentQuerySnapshot2 = await getDocs(itemsRef2);
    setTartasItems2(currentQuerySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef3 = query(tartasRef, where('itemRow', '==', 3));
    const currentQuerySnapshot3 = await getDocs(itemsRef3);
    setTartasItems3(currentQuerySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

    useEffect(() => {
      getDbmessages();
      getTartas();
    }, []);

    function returnHome() {
        setTartasScreen(false);
        setHome(true);
      };


    function showTortas() {
        setTartasScreen(false);
        setCakesScreen(true);
    };

    function showSalado() {
      setTartasScreen(false);
      setSaladoScreen(true);
  };

    function showBudines() {
      setTartasScreen(false);
      setBudinesScreen(true);
  };

  function showOtros() {
    setTartasScreen(false);
    setOtrosScreen(true);
};

function goToProduct(e) {
  setTartasScreen(false);
  setProductScreen(true);
  setCurrentSection('Tartas');
  setProductImage(e.currentTarget.title);
  setProductName(e.currentTarget.alt);
  setProductPrice(e.currentTarget.id);
  setProductDesc(e.currentTarget.name);
};

function showCart() {
  setCartScreen(true);
  setTartasScreen(false);
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
          <h2 onClick={showTortas}>TORTAS</h2>
          <h2>TARTAS</h2>
          <h2 onClick={showSalado}>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Tartas</h2>
      </div>
      <h1 className='sectionTitle'>LAS TARTAS</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
        {tartasItems.map((tartaItem) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tartaItem.itemIMG} className="sectionIMG" title={tartaItem.itemIMG} name={tartaItem.itemDesc} id={tartaItem.itemPrice} alt={tartaItem.itemName}/>
                    <h1 className='itemName'>{tartaItem.itemName}</h1>
                    <h1 className='itemPrice'>{tartaItem.itemPrice}</h1>
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {tartasItems2.map((tartaItem2) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tartaItem2.itemIMG} className="sectionIMG" title={tartaItem2.itemIMG} name={tartaItem2.itemDesc} id={tartaItem2.itemPrice} alt={tartaItem2.itemName}/>
                    <h1 className='itemName'>{tartaItem2.itemName}</h1>
                    <h1 className='itemPrice'>{tartaItem2.itemPrice}</h1>
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {tartasItems3.map((tartaItem3) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tartaItem3.itemIMG} className="sectionIMG" title={tartaItem3.itemIMG} name={tartaItem3.itemDesc} id={tartaItem3.itemPrice} alt={tartaItem3.itemName}/>
                    <h1 className='itemName'>{tartaItem3.itemName}</h1>
                    <h1 className='itemPrice'>{tartaItem3.itemPrice}</h1>
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

export default Tartas;