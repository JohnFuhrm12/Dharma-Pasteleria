import './App.css';
import {useState, useEffect} from 'react';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import whatsapp from './static/whatsapp.webp'

// Paypal Imports
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 

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

function PaymentComplete( {...props} ) {

    const [searchKey, setSearchKey] = useState('');
    const [orderItems, setOrderItems] = useState([]);
    const orderRef = collection(db, "orders");
    const cartRef = collection(db, "cart");

    const message = `¡Hola! Vengo de https://dharmapasteleria.netlify.app/. Mi numero de pedido es ${props.currentOrder}.`;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;

    const getCurrentOrder = async () => {
            const itemsRef = query(orderRef, where('orderNumber', '==', props.currentOrder));
            const currentQuerySnapshot = await getDocs(itemsRef);
            setOrderItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      };

    useEffect(() => {     
        props.getDbmessages();
        getCurrentOrder();
        clearCart();
    }, [props.currentOrder]);

    const clearCart = async () => {
      const currentDoc = query(cartRef, where('user', '==', props.currentUser));
      const querySnapshot = await getDocs(currentDoc);

      querySnapshot.forEach((docu) => {
        deleteDoc(doc(db, 'cart', docu.id));
      });
    };

  function returnHome() {
    props.setPaymentComplete(false);
    props.setHome(true);
  };

  function showCart() {
    props.setCartScreen(true);
    props.setPaymentComplete(false);
  };

  function showCakes() {
    props.setPaymentComplete(false);
    props.setCakesScreen(true);
  };

  function showTartas() {
    props.setPaymentComplete(false);
    props.setTartasScreen(true);
  };

  function showSalado() {
    props.setPaymentComplete(false);
    props.setSaladoScreen(true);
  };

  function showBudines() {
    props.setPaymentComplete(false);
    props.setBudinesScreen(true);
  };

  function showOtros() {
    props.setPaymentComplete(false);
    props.setOtrosScreen(true);
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
        props.setSearchQuery(searchKey);
        props.setSearchScreen(true);
        props.setPaymentComplete(false);
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
      <div className='confirmBox'>
        {props.orderPayment === 'Tarjeta' ? <h1 className='confirmTitle'>¡Compra Realizada!</h1> : <h1 className='confirmTitle'>¡Pedido Realizado!</h1>}
        <h2 className='confirmSubTitle'>¡Muchas gracias por elegir a nosotros! Se puede encontrar sus detalles del pedido abajo.</h2>
        {orderItems.map((orderItem) => {
            return (
                <>
                <div className='orderDetails'>
                    <h1 className='orderTitle'>Detalles del Pedido:</h1>
                    <h2 className='orderSubtitle'>Total del Pedido: {orderItem.orderTotal}</h2>
                    <h2 className='orderSubtitle'>Número del Pedido: {orderItem.orderNumber}</h2>
                    <h2 className='orderSubtitle'>Productos: {orderItem.orderProducts}</h2>
                </div>
                {props.orderService === 'Domicilio' ?
                <div className='shippingDetails'>
                    <h1 className='orderTitle'>Detalles del Envío:</h1>
                    <h2 className='orderSubtitle'>Su Orden se Enviará a: {orderItem.clientAddress}</h2>
                    <h2 className='orderSubtitle'>Fecha de Entrega Estimada: {today}</h2> 
                    <div className='orderWhatsapp'>
                      <h2 className='orderSubtitle'>Coordine su Pedido:</h2> 
                      <a target="_blank" href={`https://wa.me/5491159061461?text=${message}`}><img src={whatsapp} className='whatsappLogo'></img></a>
                    </div>
                </div>
                : <></>}
                {props.orderService === 'Para Llevar' ?
                <div className='shippingDetails'>
                    <h1 className='orderTitle'>Detalles del Retiro:</h1>
                    <h2 className='orderSubtitle'>Su Orden se Recoge por Acá: Dr. Amadeo Sabattini 4545, B1678 Caseros, Provincia de Buenos Aires, Argentina</h2>
                    <h2 className='orderSubtitle'>Estará listo dentro de 24hrs. Contactános por Whatsapp para coordinar.</h2> 
                    <div className='orderWhatsapp'>
                      <h2 className='orderSubtitle'>Consulte su Pedido:</h2>
                      <a target="_blank" href={`https://wa.me/5491159061461?text=${message}`}><img src={whatsapp} className='whatsappLogo'></img></a> 
                    </div>
                </div>
                : <></>}
                </>
            )
            })}
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

export default PaymentComplete;