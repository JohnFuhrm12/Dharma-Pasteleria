import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

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

function Search( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, setClientInfoScreen, cartAmount, currentUser} ) {

  const [clientFirstName, setClientFirstName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('Effectivo');

  const [clientLastName, setClientLastName] = useState('');
  const [countryName, setCountryName] = useState('Argentina');
  const [buildingName, setBuildingName] = useState('');
  const [cityName, setCityName] = useState('');
  const [emailName, setEmailName] = useState('');
  const [service, setService] = useState('Domicilio');

  const [firstPage, setFirstPage] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [newSum, setNewSum] = useState(0);
  const totals = [];
  const cartRef = collection(db, "cart");

  let sum = 0;

  const getDbmessages = async () => {
    const itemsRef = query(cartRef, where('user', '==', currentUser));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setCartItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

    useEffect(() => {     
        getDbmessages();
    }, []);

    setTimeout( function() { getTotal(); }, 1000);

  useEffect(() => {
    console.log('search');
  });

  function returnHome() {
    setClientInfoScreen(false);
    setHome(true);
  };

  function showCakes() {
    setClientInfoScreen(false);
    setCakesScreen(true);
  };

  function showTartas() {
    setClientInfoScreen(false);
    setTartasScreen(true);
  };

  function showSalado() {
    setClientInfoScreen(false);
    setSaladoScreen(true);
  };

  function showBudines() {
    setClientInfoScreen(false);
    setBudinesScreen(true);
  };

  function showOtros() {
    setClientInfoScreen(false);
    setOtrosScreen(true);
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
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <div>
        <h1>SEARCH</h1>
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

export default Search;