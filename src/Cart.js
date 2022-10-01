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

function Cart( {...props} ) {

    const [searchKey, setSearchKey] = useState('');

    const [cartItems, setCartItems] = useState([]);
    const [newSum, setNewSum] = useState(0);
    const totals = [];
    const cartRef = collection(db, "cart");

    const cartAmount = cartItems.length;

    let sum = 0;

    const getDbmessages = async () => {
        const itemsRef = query(cartRef, where('user', '==', props.currentUser));
        const currentQuerySnapshot = await getDocs(itemsRef);
        setCartItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      };

      function getTotal() {
        props.cartItems.map((cartItem) => {
          totals.push(cartItem.itemPrice * cartItem.itemQuantity)
        })

        totals.forEach(item => {
          sum += item;
        });

        setNewSum(sum);
        props.setPaypalTotal(newSum.toFixed(2));
      };

    useEffect(() => {     
        props.getDbmessages();
        getTotal();
    }, []);

    setTimeout( function() { getTotal(); }, 1000);

    function returnHome() {
        props.setCartScreen(false);
        props.setHome(true);
      };

    function showClientInfo() {
        props.setCartScreen(false);
        props.setClientInfoScreen(true);
    };

    const subtract = async (cartItem) => {
    if (cartItem.itemQuantity > 0) {
        await setDoc(doc(db, "cart", cartItem.id), {
        itemQuantity: firebase.firestore.FieldValue.increment(-1),
        }, { merge: true });

        props.getDbmessages();
    };

    if (cartItem.itemQuantity === 1) {
        removeItem(cartItem);
    };

        props.getDbmessages();
    };

    const add = async (cartItem) => {
        await setDoc(doc(db, "cart", cartItem.id), {
        itemQuantity: firebase.firestore.FieldValue.increment(1),
        }, { merge: true });

        props.getDbmessages();
    };

    const removeItem = async (cartItem) => {
        await deleteDoc(doc(db, "cart", cartItem.id));
        props.getDbmessages();
    };

  function searchFunc(e) {
    if(e.key === 'Enter') {
        props.setSearchQuery(searchKey);
        props.setSearchScreen(true);
        props.setCartScreen(false);
    };
  };

  function showProductSelection(e) {
    props.setCartScreen(false);
    props.setProductSelectionCategory(e.currentTarget.title);
    props.setProductSelectionScreen(true);
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
            <img src={cart} className="cart" alt="Carrito"/>
            <p className='cartQuantity'>{props.cartAmount}</p>
          </div>
      </div>
      <div className='sectionBar'>
        <h2 className='sectionHeading'>Cart</h2>
      </div>
      <div className='cartTable'>
        <h1>Product</h1>
        <h1>Price</h1>
        <h1>Quantity</h1>
        <h1>SubTotal</h1>
      </div>
      {props.cartItems.map((cartItem) => {
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
          <h1 className='cartTotalHeader'>Cart Total</h1>
          <h1>${newSum.toFixed(2)}</h1>
          <button onClick={showClientInfo} className='procedeButton'>Procede</button>
        </div>
        <svg className='bottomWave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
                <path fill="#092849" fill-opacity="1" d="M0,96L34.3,90.7C68.6,85,137,75,206,85.3C274.3,96,343,128,411,138.7C480,149,549,139,617,117.3C685.7,96,754,64,823,58.7C891.4,53,960,75,1029,96C1097.1,117,1166,139,1234,144C1302.9,149,1371,139,1406,133.3L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"/>
            </svg>
    </div>
    </>
  );
}

export default Cart;