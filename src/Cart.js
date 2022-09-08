import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';
import Praline from './static/tortaPraline.png';
import Nuez from './static/tortaNuez.png';



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

function Cart( {setHome, setSearchScreen, searchQuery, setSearchQuery, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, setCartScreen, setClientInfoScreen, currentUser, paypalTotal, setPaypalTotal} ) {

    const [searchKey, setSearchKey] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [newSum, setNewSum] = useState(0);
    const totals = [];
    const cartRef = collection(db, "cart");

    const cartAmount = cartItems.length;

    let sum = 0;

    const getDbmessages = async () => {
        const itemsRef = query(cartRef, where('user', '==', currentUser));
        const currentQuerySnapshot = await getDocs(itemsRef);
        setCartItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      };

      function getTotal() {
        cartItems.map((cartItem) => {
          totals.push(cartItem.itemPrice * cartItem.itemQuantity)
        })

        totals.forEach(item => {
          sum += item;
        });

        setNewSum(sum);
        setPaypalTotal((newSum / 282.50).toFixed(2));
      };

    useEffect(() => {     
        getDbmessages();
        getTotal();
    }, []);

    setTimeout( function() { getTotal(); }, 1000);

    function returnHome() {
        setCartScreen(false);
        setHome(true);
      };

    function showTortas() {
        setCartScreen(false);
        setCakesScreen(true);
    };

    function showTartas() {
        setCartScreen(false);
        setTartasScreen(true);
    };

    function showSalado() {
      setCartScreen(false);
      setSaladoScreen(true);
  };

    function showBudines() {
      setCartScreen(false);
      setBudinesScreen(true);
  };

  function showOtros() {
    setCartScreen(false);
    setOtrosScreen(true);
};

function showClientInfo() {
  setCartScreen(false);
  setClientInfoScreen(true);
};

const subtract = async (cartItem) => {
  if (cartItem.itemQuantity > 0) {
    await setDoc(doc(db, "cart", cartItem.id), {
      itemQuantity: firebase.firestore.FieldValue.increment(-1),
    }, { merge: true });

    getDbmessages();
  };

  if (cartItem.itemQuantity === 1) {
    removeItem(cartItem);
  };

    getDbmessages();
  };

  const add = async (cartItem) => {
    await setDoc(doc(db, "cart", cartItem.id), {
      itemQuantity: firebase.firestore.FieldValue.increment(1),
    }, { merge: true });

    getDbmessages();
  };

  const removeItem = async (cartItem) => {
    await deleteDoc(doc(db, "cart", cartItem.id));
    getDbmessages();
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
      setSearchQuery(searchKey);
      setSearchScreen(true);
      setCartScreen(false);
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
          <img src={cart} className="cart" alt="Carrito"/>
          <p className='cartQuantity'>{cartAmount}</p>
        </div>
      </div>
      <h2 onClick={returnHome} className='subtitle'>Buenos Aires</h2>
      <div className='categories-box'>
        <div className='categories'>
          <h2 onClick={showTortas}>TORTAS</h2>
          <h2 onClick={showTartas}>TARTAS</h2>
          <h2 onClick={showSalado}>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 className='sectionHeading'>Carrito</h2>
      </div>
      <div className='cartTable'>
        <h1>Producto</h1>
        <h1>Precio</h1>
        <h1>Cantidad</h1>
        <h1>Total Parcial</h1>
      </div>
      {cartItems.map((cartItem) => {
          return (
            <div className='cartList'>
                <div className='cartTableProducts'>
                  <h1 onClick={() => removeItem(cartItem)} className='cancel'>x</h1>
                <div className='cartImageTitle'>
                    <img src={cartItem.itemIMG} className="cartImage" alt="ItemIMG"/>
                    <h1 className='cartItemName'>{cartItem.itemName}</h1>
                </div>
                <h1 className='cartItemName'>${cartItem.itemPrice}</h1>
                <div className='addSubtCart2'>
                    <button className='subtButton' onClick={() => subtract(cartItem)}>-</button>
                    <h1 className='quantity'>{cartItem.itemQuantity}</h1>
                    <button className='addButton' onClick={() => add(cartItem)}>+</button>
                </div>
                <h1 className='cartItemName'>${cartItem.itemPrice * cartItem.itemQuantity}</h1>
                </div>
            </div>
          )
        })}
        <div className='cartTotalBox'>
          <h1 className='cartTotalHeader'>Carrito Total</h1>
          <h1>${newSum}</h1>
          <button onClick={showClientInfo} className='procedeButton'>Finalizar Pedido</button>
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

export default Cart;