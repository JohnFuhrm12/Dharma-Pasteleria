import './App.css';
import {useState, useEffect} from 'react';
import Homescreen from './Homescreen';
import Tortas from './Tortas';
import Tartas from './Tartas';
import Salado from './Salado';
import Budines from './Budines';
import Otros from './Otros';

import Product from './Product';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWkqnRPfh3R2WIesSODdKFns4ymZridvM",
  authDomain: "dharma-ec35e.firebaseapp.com",
  projectId: "dharma-ec35e",
  storageBucket: "dharma-ec35e.appspot.com",
  messagingSenderId: "79111090409",
  appId: "1:79111090409:web:b41568c2860577b3844078"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function App() {
  const [home, setHome] = useState(true);

  const [cakesScreen, setCakesScreen] = useState(false);
  const [tartasScreen, setTartasScreen] = useState(false);
  const [saladoScreen, setSaladoScreen] = useState(false);
  const [budinesScreen, setBudinesScreen] = useState(false);
  const [otrosScreen, setOtrosScreen] = useState(false);

  const [productScreen, setProductScreen] = useState(false);
  const [productImage, setProductImage] = useState();
  const [productName, setProductName] = useState(''); 
  const [productPrice, setProductPrice] = useState(''); 
  const [productDesc, setProductDesc] = useState(''); 

  const [cartAmount, setCartAmount] = useState(0); 

  return (
    <>
      {home ? <Homescreen setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div> }
      {cakesScreen && home === false ? <Tortas setHome={setHome} setProductScreen={setProductScreen} setProductDesc={setProductDesc} setProductImage={setProductImage} setProductName={setProductName} setProductPrice={setProductPrice} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {tartasScreen && home === false ? <Tartas setHome={setHome} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {saladoScreen && home === false ? <Salado setHome={setHome} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {budinesScreen && home === false ? <Budines setHome={setHome} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {otrosScreen && home === false ? <Otros setHome={setHome} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {productScreen && home === false && cakesScreen === false && tartasScreen === false && saladoScreen === false && budinesScreen === false && otrosScreen === false ? <Product setHome={setHome} setProductScreen={setProductScreen} productImage={productImage} setProductImage={setProductImage} productName={productName}setProductName={setProductName} productPrice={productPrice} productDesc={productDesc} setProductPrice={setProductPrice} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
    </>
  );
}

export default App;
