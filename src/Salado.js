import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import scons from './static/scons.png';

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


function Salado( {setHome, admin, setCurrentSection, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, cartAmount, setProductScreen, setProductImage, setProductName, setProductPrice, setProductDesc, setCartScreen, getDbmessages} ) {

  const [description, setDescription] = useState([]);
  const [price, setPrice] = useState([]);

  const [saladoItems, setSaladoItems] = useState([]);
  const [saladoItems2, setSaladoItems2] = useState([]);
  const [saladoItems3, setSaladoItems3] = useState([]);
  const saladoRef = collection(db, "salado");

  const getSalado = async () => {
    const itemsRef = query(saladoRef, where('itemRow', '==', 1));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setSaladoItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef2 = query(saladoRef, where('itemRow', '==', 2));
    const currentQuerySnapshot2 = await getDocs(itemsRef2);
    setSaladoItems2(currentQuerySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef3 = query(saladoRef, where('itemRow', '==', 3));
    const currentQuerySnapshot3 = await getDocs(itemsRef3);
    setSaladoItems3(currentQuerySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  useEffect(() => {
    getDbmessages();
    getSalado();
  }, []);

  function returnHome() {
    setSaladoScreen(false);
    setHome(true);
  };

  function showCakes() {
    setSaladoScreen(false);
    setCakesScreen(true);
  };

  function showTartas() {
    setSaladoScreen(false);
    setTartasScreen(true);
  };

  function showBudines() {
    setSaladoScreen(false);
    setBudinesScreen(true);
  };

  function showOtros() {
    setSaladoScreen(false);
    setOtrosScreen(true);
  };

  function goToProduct(e) {
    setSaladoScreen(false);
    setProductScreen(true);
    setCurrentSection('Salado');
    setProductImage(e.currentTarget.title);
    setProductName(e.currentTarget.alt);
    setProductPrice(e.currentTarget.id);
    setProductDesc(e.currentTarget.name);
  };

  function showCart() {
    setCartScreen(true);
    setSaladoScreen(false);
  };

  const deleteItem = async (e, saladoItem) => {
    e.preventDefault();
    await deleteDoc(doc(db, "salado", saladoItem.id));
    getSalado();
  };

  const updateItemDesc = async (e, saladoItem) => {
    await setDoc(doc(db, "salado", saladoItem.id), { merge: true }, {
      itemDesc: description,
    });
    getSalado();
    setDescription('');
    e.preventDefault();
  };

  const updatePrice = async (e, saladoItem) => {
    await setDoc(doc(db, "salado", saladoItem.id), { merge: true }, {
      itemPrice: price,
    });
    getSalado();
    setPrice('');
    e.preventDefault();
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
          <h2 onClick={showCakes}>TORTAS</h2>
          <h2 onClick={showTartas}>TARTAS</h2>
          <h2>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Salado</h2>
      </div>
      <h1 className='sectionTitle'>Lo Salado</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
        {saladoItems.map((saladoItem) => {
            return (
                    <div>
                      <img onClick={goToProduct} src={saladoItem.itemIMG} className="sectionIMG" title={saladoItem.itemIMG} name={saladoItem.itemDesc} id={saladoItem.itemPrice} alt={saladoItem.itemName}/>
                      <h1 className='itemName'>{saladoItem.itemName}</h1>
                      <h1 className='itemPrice'>{saladoItem.itemPrice}</h1>
                      {admin ? 
                      <>
                      <form>
                        <label for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button onClick={() => updatePrice(saladoItem)}>Update</button>
                      </form>
                      </> : <></>}
                      {admin ? 
                      <>
                      <h2>Desc: {saladoItem.itemDesc}</h2>
                      <form>
                        <label for="Desc">Descripcion:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button onClick={() => updateItemDesc(saladoItem)}>Update</button>
                      </form>
                      </> : <></>}
                      {admin ? <h2>Row: {saladoItem.itemRow}</h2> : <></>}
                      {admin ? <h1 onClick={() => deleteItem(saladoItem)}>X</h1> : <></>}
                    </div>
            )
          })}
          </div>
          <div className='sectionImagesBottom'>
        {saladoItems2.map((saladoItem2) => {
            return (
                    <div>
                      <img onClick={goToProduct} src={saladoItem2.itemIMG} className="sectionIMG" title={saladoItem2.itemIMG} name={saladoItem2.itemDesc} id={saladoItem2.itemPrice} alt={saladoItem2.itemName}/>
                      <h1 className='itemName'>{saladoItem2.itemName}</h1>
                      <h1 className='itemPrice'>{saladoItem2.itemPrice}</h1>
                    </div>
            )
          })}
          </div>
          <div className='sectionImagesBottom'>
        {saladoItems3.map((saladoItem3) => {
            return (
                    <div>
                      <img onClick={goToProduct} src={saladoItem3.itemIMG} className="sectionIMG" title={saladoItem3.itemIMG} name={saladoItem3.itemDesc} id={saladoItem3.itemPrice} alt={saladoItem3.itemName}/>
                      <h1 className='itemName'>{saladoItem3.itemName}</h1>
                      <h1 className='itemPrice'>{saladoItem3.itemPrice}</h1>
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

export default Salado;