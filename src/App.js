import './App.css';
import {useState, useEffect} from 'react';
import Homescreen from './Homescreen';
import Tortas from './Tortas';
import Tartas from './Tartas';
import Salado from './Salado';
import Budines from './Budines';
import Otros from './Otros';

import Admin from './Admin';

import Product from './Product';
import Cart from './Cart';
import ClientInfo from './ClientInfo';

import useLocalStorage from "./useLocalStorage";

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

function App() {
  const [home, setHome] = useState(true);

  const [admin, setAdmin] = useState(false);
  const [adminScreen, setAdminScreen] = useState(false);

  const [cakesScreen, setCakesScreen] = useState(false);
  const [tartasScreen, setTartasScreen] = useState(false);
  const [saladoScreen, setSaladoScreen] = useState(false);
  const [budinesScreen, setBudinesScreen] = useState(false);
  const [otrosScreen, setOtrosScreen] = useState(false);

  const [cartScreen, setCartScreen] = useState(false);
  const [clientInfoScreen, setClientInfoScreen] = useState(false);

  const [productScreen, setProductScreen] = useState(false);
  const [productImage, setProductImage] = useState();
  const [productName, setProductName] = useState(''); 
  const [productPrice, setProductPrice] = useState(''); 
  const [productDesc, setProductDesc] = useState(''); 

  var id = "id" + Math.random().toString(16).slice(2);
  const [currentUser, setCurrentUser] = useLocalStorage();

  const [currentSection, setCurrentSection] = useState('');

  const [paypalTotal, setPaypalTotal] = useState('0.02');

  const [cartItems, setCartItems] = useState([]);
  const cartAmount = cartItems.length;
  const cartRef = collection(db, "cart");

  const getDbmessages = async () => {
      const itemsRef = query(cartRef, where('user', '==', currentUser));
      const currentQuerySnapshot = await getDocs(itemsRef);
      setCartItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
      };

  useEffect(() => {     
      getDbmessages();

      if (currentUser === undefined) {
        setCurrentUser(id);
      };
      console.log(currentUser);
      console.log(cartAmount);
    }, []);

  return (
    <>
      {home ? <Homescreen setHome={setHome} setAdminScreen={setAdminScreen} setAdmin={setAdmin} currentUser={currentUser} getDbmessages={getDbmessages} cartAmount={cartAmount} setCartScreen={setCartScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div> }
      {cakesScreen && home === false ? <Tortas setHome={setHome} currentUser={currentUser} setCurrentSection={setCurrentSection} getDbmessages={getDbmessages}  cartAmount={cartAmount} setCartScreen={setCartScreen} setProductScreen={setProductScreen} setProductDesc={setProductDesc} setProductImage={setProductImage} setProductName={setProductName} setProductPrice={setProductPrice} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {tartasScreen && home === false ? <Tartas setHome={setHome} currentUser={currentUser} setCurrentSection={setCurrentSection} getDbmessages={getDbmessages}  cartAmount={cartAmount} setCartScreen={setCartScreen} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen} setProductDesc={setProductDesc} setProductImage={setProductImage} setProductName={setProductName} setProductPrice={setProductPrice}/> : <div></div>}
      {saladoScreen && home === false ? <Salado setHome={setHome} currentUser={currentUser} setCurrentSection={setCurrentSection} getDbmessages={getDbmessages}  cartAmount={cartAmount} setCartScreen={setCartScreen} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen} setProductDesc={setProductDesc} setProductImage={setProductImage} setProductName={setProductName} setProductPrice={setProductPrice}/> : <div></div>}
      {budinesScreen && home === false ? <Budines setHome={setHome} currentUser={currentUser} setCurrentSection={setCurrentSection} getDbmessages={getDbmessages}  cartAmount={cartAmount} setCartScreen={setCartScreen} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen} setProductDesc={setProductDesc} setProductImage={setProductImage} setProductName={setProductName} setProductPrice={setProductPrice}/> : <div></div>}
      {otrosScreen && home === false ? <Otros setHome={setHome} currentUser={currentUser} setCurrentSection={setCurrentSection} getDbmessages={getDbmessages}  cartAmount={cartAmount} setCartScreen={setCartScreen} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen} setProductDesc={setProductDesc} setProductImage={setProductImage} setProductName={setProductName} setProductPrice={setProductPrice}/> : <div></div>}
      {productScreen && home === false && cakesScreen === false && tartasScreen === false && saladoScreen === false && budinesScreen === false && otrosScreen === false ? <Product setHome={setHome} currentUser={currentUser} currentSection={currentSection} setCartItems={setCartItems} cartAmount={cartAmount} setCartScreen={setCartScreen} setProductScreen={setProductScreen} productImage={productImage} setProductImage={setProductImage} productName={productName}setProductName={setProductName} productPrice={productPrice} productDesc={productDesc} setProductPrice={setProductPrice} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {cartScreen && home === false ? <Cart setHome={setHome} paypalTotal={paypalTotal} setPaypalTotal={setPaypalTotal} currentUser={currentUser} setClientInfoScreen={setClientInfoScreen} cartAmount={cartAmount} setCartScreen={setCartScreen} setProductScreen={setProductScreen} setProductDesc={setProductDesc} setProductImage={setProductImage} setProductName={setProductName} setProductPrice={setProductPrice} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {clientInfoScreen && home === false ? <ClientInfo setHome={setHome} paypalTotal={paypalTotal} setPaypalTotal={setPaypalTotal} setCartScreen={setCartScreen} currentUser={currentUser} cartAmount={cartAmount} setClientInfoScreen={setClientInfoScreen} setCartScreen={setCartScreen} setProductScreen={setProductScreen} setProductDesc={setProductDesc} setProductImage={setProductImage} setProductName={setProductName} setProductPrice={setProductPrice} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {adminScreen && home === false && cakesScreen === false && tartasScreen === false && saladoScreen === false && budinesScreen === false && otrosScreen === false ? <Admin setHome={setHome} setAdminScreen={setAdminScreen} setAdmin={setAdmin} currentUser={currentUser} currentSection={currentSection} setCartItems={setCartItems} cartAmount={cartAmount} setCartScreen={setCartScreen} setProductScreen={setProductScreen} productImage={productImage} setProductImage={setProductImage} productName={productName}setProductName={setProductName} productPrice={productPrice} productDesc={productDesc} setProductPrice={setProductPrice} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
    </>
  );
}

export default App;
