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

function Search( {...props} ) {

  const [searchKey, setSearchKey] = useState('');

  const [searchItemsCategory, setSearchItemsCategory] = useState([]);
  const [searchItemsName, setSearchItemsName] = useState([]);
  const [searchItemsFlavor, setSearchItemsFlavor] = useState([]);
  const searchRef = collection(db, 'products');

  const lowerCaseCategory = props.searchQuery.toLowerCase();

  const words = props.searchQuery.split(" ");
  const upperCaseName = words.map((word) => { 
                            return word[0].toUpperCase() + word.substring(1); 
                        }).join(" ");                      

  const lowerCaseFlavor = props.searchQuery.toLowerCase();

  const getSearchItems = async () => {
    const itemsRefCategory = query(searchRef, where('itemCategory', '==', lowerCaseCategory));
    const currentQuerySnapshotCategory = await getDocs(itemsRefCategory);
    setSearchItemsCategory(currentQuerySnapshotCategory.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRefName = query(searchRef, where('itemName', '==', upperCaseName));
    const currentQuerySnapshotName = await getDocs(itemsRefName);
    setSearchItemsName(currentQuerySnapshotName.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRefFlavor = query(searchRef, where('itemFlavor', '==', lowerCaseFlavor));
    const currentQuerySnapshotFlavor = await getDocs(itemsRefFlavor);
    setSearchItemsFlavor(currentQuerySnapshotFlavor.docs.map((doc) => ({ ...doc.data(), id: doc.id}))); 
  };

    useEffect(() => {     
      props.getDbmessages();
      getSearchItems();
    }, []);

  function returnHome() {
    props.setSearchScreen(false);
    props.setHome(true);
  };

  function showCakes() {
    props.setSearchScreen(false);
    props.setCakesScreen(true);
  };

  function showTartas() {
    props.setSearchScreen(false);
    props.setTartasScreen(true);
  };

  function showSalado() {
    props.setSearchScreen(false);
    props.setSaladoScreen(true);
  };

  function showBudines() {
    props.setSearchScreen(false);
    props.setBudinesScreen(true);
  };

  function showOtros() {
    props.setSearchScreen(false);
    props.setOtrosScreen(true);
  };

  function showCart() {
    props.setCartScreen(true);
    props.setSearchScreen(false);
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
      props.searchQuery(searchKey);
      getSearchItems();
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
      <div>
        <h1>Resultados de Busqueda de: ({props.searchQuery})</h1>
        {searchItemsCategory.map((searchItemCat) => {
            return (
              <>
               <div className='cartList'>
                <div className='cartTableProducts'>
                <div className='cartImageTitle'>
                    <img src={searchItemCat.itemIMG} className="cartImage" alt="ItemIMG"/>
                    <h1 className='cartItemName'>{searchItemCat.itemName}</h1>
                </div>
                <h1 className='cartItemName'>{searchItemCat.itemPrice}</h1>
                </div>
            </div>
              </>
            )
            })}
            {searchItemsName.map((searchItemName) => {
            return (
              <>
              <div className='cartList'>
                <div className='cartTableProducts'>
                <div className='cartImageTitle'>
                    <img src={searchItemName.itemIMG} className="cartImage" alt="ItemIMG"/>
                    <h1 className='cartItemName'>{searchItemName.itemName}</h1>
                </div>
                <h1 className='cartItemName'>{searchItemName.itemPrice}</h1>
                </div>
            </div>
              </>
            )
            })}
            {searchItemsFlavor.map((searchItemFlavor) => {
            return (
              <>
              <div className='cartList'>
                <div className='cartTableProducts'>
                <div className='cartImageTitle'>
                    <img src={searchItemFlavor.itemIMG} className="cartImage" alt="ItemIMG"/>
                    <h1 className='cartItemName'>{searchItemFlavor.itemName}</h1>
                </div>
                <h1 className='cartItemName'>{searchItemFlavor.itemPrice}</h1>
                </div>
            </div>
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

export default Search;