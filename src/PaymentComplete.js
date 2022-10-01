import './App.css';
import {useState, useEffect} from 'react';

import cart from './static/cart.png';
import search from './static/search.png';

import coralHome from './static/coralHome.jpg';

// Paypal Imports
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";
import userEvent from '@testing-library/user-event';
import { CheckCircleFilled } from '@ant-design/icons';

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

function PaymentComplete( {...props} ) {

    const [searchKey, setSearchKey] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    const orderRef = collection(db, "orders");

    const getCurrentOrder = async () => {
            const itemsRef = query(orderRef, where('orderNumber', '==', props.currentOrder));
            const currentQuerySnapshot = await getDocs(itemsRef);
            setOrderItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      };

    useEffect(() => {     
        props.getDbmessages();
        getCurrentOrder();
    }, [props.currentOrder]);

  function returnHome() {
    props.setPaymentComplete(false);
    props.setHome(true);
  };

  function showCart() {
    props.setCartScreen(true);
    props.setPaymentComplete(false);
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
        props.setSearchQuery(searchKey);
        props.setSearchScreen(true);
        props.setPaymentComplete(false);
    };
  };

  function showProductSelection(e) {
    props.setPaymentComplete(false);
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
            <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
            <p className='cartQuantity'>{props.cartAmount}</p>
          </div>
      </div>
      <div className='confirmBox'>
        <h1 className='confirmTitle'>Order Complete!</h1>
        <h2 className='confirmSubTitle'>Thank you for shopping with us! You can find your order details below.</h2>
        {orderItems.map((orderItem) => {
            return (
                <>
                <div className='orderDetails'>
                    <h1 className='orderTitle'>Order Details:</h1>
                    <h2 className='orderSubtitle'>Order Total: {orderItem.orderTotal}</h2>
                    <h2 className='orderSubtitle'>Order Number: {orderItem.orderNumber}</h2>
                    <h2 className='orderSubtitle'>Products: {orderItem.orderProducts}</h2>
                </div>
                <div className='shippingDetails'>
                    <h1 className='orderTitle'>Shipping Details:</h1>
                    <h2 className='orderSubtitle'>Your order will be sent to: {orderItem.clientAddress}</h2>
                    <h2 className='orderSubtitle'>Estimated Delivery Date: {Date(Date.now())}</h2>
                </div>
                </>
            )
            })}
        </div>
      <svg className='bottomWave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
                <path fill="#092849" fill-opacity="1" d="M0,96L34.3,90.7C68.6,85,137,75,206,85.3C274.3,96,343,128,411,138.7C480,149,549,139,617,117.3C685.7,96,754,64,823,58.7C891.4,53,960,75,1029,96C1097.1,117,1166,139,1234,144C1302.9,149,1371,139,1406,133.3L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"/>
            </svg>
    </div>
    </>
  );
}

export default PaymentComplete;