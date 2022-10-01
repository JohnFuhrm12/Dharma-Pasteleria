import './App.css';
import {useState, useEffect} from 'react';
import Homescreen from './Homescreen';
import Tortas from './Tortas';
import Tartas from './Tartas';
import Salado from './Salado';
import Budines from './Budines';
import Otros from './Otros';

import Admin from './Admin';
import Search from './Search';

import Product from './Product';
import Cart from './Cart';
import ClientInfo from './ClientInfo';
import PaymentComplete from './PaymentComplete';

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

  const [searchScreen, setSearchScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


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

  const [paymentComplete, setPaymentComplete] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('');

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

    const props = { 
      home,
      cartAmount,
      setHome,
      getDbmessages,
      searchScreen,
      setSearchScreen,
      searchQuery,
      setSearchQuery,
      adminScreen,
      setAdminScreen,
      admin,
      setAdmin,
      productScreen, 
      setProductScreen,
      productImage,
      setProductImage,
      productName,
      setProductName,
      productPrice,
      setProductPrice,
      productDesc,
      setProductDesc,
      currentSection,
      setCurrentSection,
      currentUser,
      cartScreen,
      setCartScreen, 
      clientInfoScreen,
      setClientInfoScreen,
      paypalTotal,
      setPaypalTotal,
      cartItems,
      setCartItems,
      paymentComplete,
      setPaymentComplete,
      currentOrder,
      setCurrentOrder,
      cakesScreen,
      setCakesScreen,
      tartasScreen,
      setTartasScreen,
      saladoScreen,
      setSaladoScreen,
      budinesScreen,
      setBudinesScreen,
      otrosScreen,
      setOtrosScreen,
   };

  return (
    <>
      {home ? <Homescreen {...props}/> : <></> }
      {cakesScreen ? <Tortas {...props}/> : <></>}
      {tartasScreen ? <Tartas {...props}/> : <></>}
      {saladoScreen ? <Salado {...props}/> : <></>}
      {budinesScreen ? <Budines {...props}/> : <></>}
      {otrosScreen ? <Otros {...props}/> : <></>}
      {searchScreen ? <Search {...props}/> : <></>}
      {productScreen ? <Product {...props}/> : <></>}
      {cartScreen ? <Cart {...props}/> : <></>}
      {clientInfoScreen ? <ClientInfo {...props}/> : <></>}
      {paymentComplete ? <PaymentComplete {...props}/> : <></>}
      {adminScreen ? <Admin {...props}/> : <></>}
    </>
  );
}

export default App;
