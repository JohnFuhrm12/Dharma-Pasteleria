import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import budinesVeganos from './static/budinesVeganos.png';
import budinPera from './static/budindePeras.png';
import budinFrutosRojos from './static/budinFrutosRojos.png';

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

function Budines( {setHome, admin, setCurrentSection, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, cartAmount, setProductScreen, setProductImage, setProductName, setProductPrice, setProductDesc, setCartScreen, getDbmessages} ) {

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [iName, setIName] = useState('');
  const [row, setRow] = useState('');

  const [budinesItems, setBudinesItems] = useState([]);
  const [budinesItems2, setBudinesItems2] = useState([]);
  const [budinesItems3, setBudinesItems3] = useState([]);
  const budinesRef = collection(db, "budines");

  const getBudines = async () => {
    const itemsRef = query(budinesRef, where('itemRow', '==', 1));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setBudinesItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef2 = query(budinesRef, where('itemRow', '==', 2));
    const currentQuerySnapshot2 = await getDocs(itemsRef2);
    setBudinesItems2(currentQuerySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef3 = query(budinesRef, where('itemRow', '==', 3));
    const currentQuerySnapshot3 = await getDocs(itemsRef3);
    setBudinesItems3(currentQuerySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  useEffect(() => {
    getDbmessages();
    getBudines();
  }, []);

  function returnHome() {
    setBudinesScreen(false);
    setHome(true);
  };

  function showTartas() {
    setBudinesScreen(false);
    setTartasScreen(true);
  };

  function showCakes() {
    setBudinesScreen(false);
    setCakesScreen(true);
  };

  function showSalado() {
    setBudinesScreen(false);
    setSaladoScreen(true);
  };

  function showOtros() {
    setBudinesScreen(false);
    setOtrosScreen(true);
  };

  function goToProduct(e) {
    setBudinesScreen(false);
    setProductScreen(true);
    setCurrentSection('Budines');
    setProductImage(e.currentTarget.title);
    setProductName(e.currentTarget.alt);
    setProductPrice(e.currentTarget.id);
    setProductDesc(e.currentTarget.name);
  };

  function showCart() {
    setCartScreen(true);
    setBudinesScreen(false);
  };

  // Admin Delete Item (3 needed for each row)
 const deleteItem = async (e, budinItem) => {
  e.preventDefault();
  await deleteDoc(doc(db, "budines", budinItem.id));
  getBudines();
};

const deleteItem2 = async (e, budinItem2) => {
  e.preventDefault();
  await deleteDoc(doc(db, "budines", budinItem2.id));
  getBudines();
};

const deleteItem3 = async (e, budinItem3) => {
  e.preventDefault();
  await deleteDoc(doc(db, "budines", budinItem3.id));
  getBudines();
};

// Admin Update Description
const updateItemDesc = async (e, budinItem) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem.id), {
    itemDesc: description,
  }, { merge: true });
  getBudines();
  setDescription('');
};

const updateItemDesc2 = async (e, budinItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem2.id), {
    itemDesc: description,
  }, { merge: true });
  getBudines();
  setDescription('');
};

const updateItemDesc3 = async (e, budinItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem3.id), {
    itemDesc: description,
  }, { merge: true });
  getBudines();
  setDescription('');
};

// Admin Update Price
const updatePrice = async (e, budinItem) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem.id), {
    itemPrice: price,
  }, { merge: true });
  getBudines();
  setPrice('');
};

const updatePrice2 = async (e, budinItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem2.id), {
    itemPrice: price,
  }, { merge: true });
  getBudines();
  setPrice('');
};

const updatePrice3 = async (e, budinItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem3.id), {
    itemPrice: price,
  }, { merge: true });
  getBudines();
  setPrice('');
};

// Admin Update Name
const updateName = async (e, budinItem) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem.id), {
    itemName: iName,
  }, { merge: true });
  getBudines();
  setIName('');
};

const updateName2 = async (e, budinItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem2.id), {
    itemName: iName,
  }, { merge: true });
  getBudines();
  setIName('');
};

const updateName3 = async (e, budinItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem3.id), {
    itemName: iName,
  }, { merge: true });
  getBudines();
  setIName('');
};

// Admin Update Row
const updateRow = async (e, budinItem) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem.id), {
    itemRow: Number(row),
  }, { merge: true });
  getBudines();
  setRow('');
};

const updateRow2 = async (e, budinItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem2.id), {
    itemRow: Number(row),
  }, { merge: true });
  getBudines();
  setRow('');
};

const updateRow3 = async (e, budinItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "budines", budinItem3.id), {
    itemRow: Number(row),
  }, { merge: true });
  getBudines();
  setRow('');
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
          <h2 onClick={showSalado}>SALADO</h2>
          <h2>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Budines</h2>
      </div>
      <h1 className='sectionTitle'>Los Budines</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
        {budinesItems.map((budinItem) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={budinItem.itemIMG} className="sectionIMG" title={budinItem.itemIMG} name={budinItem.itemDesc} id={budinItem.itemPrice} alt={budinItem.itemName}/>
                    <h1 className='itemName'>{budinItem.itemName}</h1>
                    {admin ? 
                      <>
                      <form onSubmit={(e) => updateName(e, budinItem)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{budinItem.itemPrice}</h1>
                    {admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice(e, budinItem)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{budinItem.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc(e, budinItem)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h2 className='adminRow'>Hilera: {budinItem.itemRow}</h2> : <></>}
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updateRow(e, budinItem)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h1 className='adminDelete' onClick={(e) => deleteItem(e, budinItem)}>X</h1> : <></>}
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {budinesItems2.map((budinItem2) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={budinItem2.itemIMG} className="sectionIMG" title={budinItem2.itemIMG} name={budinItem2.itemDesc} id={budinItem2.itemPrice} alt={budinItem2.itemName}/>
                    <h1 className='itemName'>{budinItem2.itemName}</h1>
                    {admin ? 
                      <>
                      <form onSubmit={(e) => updateName2(e, budinItem2)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{budinItem2.itemPrice}</h1>
                    {admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice2(e, budinItem2)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{budinItem2.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc2(e, budinItem2)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h2 className='adminRow'>Hilera: {budinItem2.itemRow}</h2> : <></>}
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updateRow2(e, budinItem2)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h1 className='adminDelete' onClick={(e) => deleteItem2(e, budinItem2)}>X</h1> : <></>}
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {budinesItems3.map((budinItem3) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={budinItem3.itemIMG} className="sectionIMG" title={budinItem3.itemIMG} name={budinItem3.itemDesc} id={budinItem3.itemPrice} alt={budinItem3.itemName}/>
                    <h1 className='itemName'>{budinItem3.itemName}</h1>
                    {admin ? 
                      <>
                      <form onSubmit={(e) => updateName3(e, budinItem3)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{budinItem3.itemPrice}</h1>
                    {admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice3(e, budinItem3)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{budinItem3.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc3(e, budinItem3)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h2 className='adminRow'>Hilera: {budinItem3.itemRow}</h2> : <></>}
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updateRow3(e, budinItem3)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h1 className='adminDelete' onClick={(e) => deleteItem3(e, budinItem3)}>X</h1> : <></>}
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

export default Budines;