import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import cake1 from './static/torta1.png';
import cake2 from './static/torta2.png';
import Praline from './static/tortaPraline.png';
import FrutosRojos from './static/tortaFrutosRojos.png';
import Vegana from './static/tortaVegana.png';
import Nuez from './static/tortaNuez.png';
import Oreo from './static/tortaOreo.png';

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

function Tortas( {...props} ) {

  const [searchKey, setSearchKey] = useState('');

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [iName, setIName] = useState('');
  const [row, setRow] = useState('');

  const [tortasItems, setTortasItems] = useState([]);
  const [tortasItems2, setTortasItems2] = useState([]);
  const [tortasItems3, setTortasItems3] = useState([]);
  const tortasRef = collection(db, "tortas");

  const getTortas = async () => {
    const itemsRef = query(tortasRef, where('itemRow', '==', 1));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setTortasItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef2 = query(tortasRef, where('itemRow', '==', 2));
    const currentQuerySnapshot2 = await getDocs(itemsRef2);
    setTortasItems2(currentQuerySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef3 = query(tortasRef, where('itemRow', '==', 3));
    const currentQuerySnapshot3 = await getDocs(itemsRef3);
    setTortasItems3(currentQuerySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  useEffect(() => {
    props.getDbmessages();
    getTortas();
  }, []);

  function returnHome() {
    props.setCakesScreen(false);
    props.setHome(true);
  };

  function showTartas() {
    props.setCakesScreen(false);
    props.setTartasScreen(true);
  };

  function showSalado() {
    props.setCakesScreen(false);
    props.setSaladoScreen(true);
  };

  function showBudines() {
    props.setCakesScreen(false);
    props.setBudinesScreen(true);
  };

  function showOtros() {
    props.setCakesScreen(false);
    props.setOtrosScreen(true);
  };

  function showCart() {
    props.setCartScreen(true);
    props.setCakesScreen(false);
  };

  function goToProduct(e) {
    props.setCakesScreen(false);
    props.setProductScreen(true);
    props.setCurrentSection('Tortas');
    props.setProductImage(e.currentTarget.title);
    props.setProductName(e.currentTarget.alt);
    props.setProductPrice(e.currentTarget.id);
    props.setProductDesc(e.currentTarget.name);
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
      props.setSearchQuery(searchKey);
      props.setSearchScreen(true);
      props.setCakesScreen(false);
    };
  };

  // Admin Delete Item (3 needed for each row)
 const deleteItem = async (e, tortaItem) => {
  e.preventDefault();
  await deleteDoc(doc(db, "tortas", tortaItem.id));
  getTortas();
};

const deleteItem2 = async (e, tortaItem2) => {
  e.preventDefault();
  await deleteDoc(doc(db, "tortas", tortaItem2.id));
  getTortas();
};

const deleteItem3 = async (e, tortaItem3) => {
  e.preventDefault();
  await deleteDoc(doc(db, "tortas", tortaItem3.id));
  getTortas();
};

// Admin Update Description
const updateItemDesc = async (e, tortaItem) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem.id), {
    itemDesc: description,
  }, { merge: true });
  getTortas();
  setDescription('');
};

const updateItemDesc2 = async (e, tortaItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem2.id), {
    itemDesc: description,
  }, { merge: true });
  getTortas();
  setDescription('');
};

const updateItemDesc3 = async (e, tortaItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem3.id), {
    itemDesc: description,
  }, { merge: true });
  getTortas();
  setDescription('');
};

// Admin Update Price
const updatePrice = async (e, tortaItem) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem.id), {
    itemPrice: price,
  }, { merge: true });
  getTortas();
  setPrice('');
};

const updatePrice2 = async (e, tortaItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem2.id), {
    itemPrice: price,
  }, { merge: true });
  getTortas();
  setPrice('');
};

const updatePrice3 = async (e, tortaItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem3.id), {
    itemPrice: price,
  }, { merge: true });
  getTortas();
  setPrice('');
};

// Admin Update Name
const updateName = async (e, tortaItem) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem.id), {
    itemName: iName,
  }, { merge: true });
  getTortas();
  setIName('');
};

const updateName2 = async (e, tortaItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem2.id), {
    itemName: iName,
  }, { merge: true });
  getTortas();
  setIName('');
};

const updateName3 = async (e, tortaItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem3.id), {
    itemName: iName,
  }, { merge: true });
  getTortas();
  setIName('');
};

// Admin Update Row
const updateRow = async (e, tortaItem) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem.id), {
    itemRow: Number(row),
  }, { merge: true });
  getTortas();
  setRow('');
};

const updateRow2 = async (e, tortaItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem2.id), {
    itemRow: Number(row),
  }, { merge: true });
  getTortas();
  setRow('');
};

const updateRow3 = async (e, tortaItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "tortas", tortaItem3.id), {
    itemRow: Number(row),
  }, { merge: true });
  getTortas();
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
          <input onChange={(e) => {setSearchKey(e.target.value)}} onKeyDown={(e) => {searchFunc(e)}} className='searchBar' type="text" value={searchKey} placeholder="Buscar ..."></input>
          <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
          <p className='cartQuantity'>{props.cartAmount}</p>
        </div>
      </div>
      <h2 onClick={returnHome} className='subtitle'>Buenos Aires</h2>
      <div className='categories-box'>
        <div className='categories'>
          <h2>TORTAS</h2>
          <h2 onClick={showTartas}>TARTAS</h2>
          <h2 onClick={showSalado}>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Tortas</h2>
      </div>
      <h1 className='sectionTitle'>LAS TORTAS</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
        {tortasItems.map((tortaItem) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tortaItem.itemIMG} className="sectionIMG" title={tortaItem.itemIMG} name={tortaItem.itemDesc} id={tortaItem.itemPrice} alt={tortaItem.itemName}/>
                    <h1 className='itemName'>{tortaItem.itemName}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateName(e, tortaItem)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{tortaItem.itemPrice}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice(e, tortaItem)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{tortaItem.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc(e, tortaItem)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h2 className='adminRow'>Hilera: {tortaItem.itemRow}</h2> : <></>}
                      {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateRow(e, tortaItem)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h1 className='adminDelete' onClick={(e) => deleteItem(e, tortaItem)}>X</h1> : <></>}
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {tortasItems2.map((tortaItem2) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tortaItem2.itemIMG} className="sectionIMG" title={tortaItem2.itemIMG} name={tortaItem2.itemDesc} id={tortaItem2.itemPrice} alt={tortaItem2.itemName}/>
                    <h1 className='itemName'>{tortaItem2.itemName}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateName2(e, tortaItem2)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{tortaItem2.itemPrice}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice2(e, tortaItem2)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{tortaItem2.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc2(e, tortaItem2)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h2 className='adminRow'>Hilera: {tortaItem2.itemRow}</h2> : <></>}
                      {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateRow2(e, tortaItem2)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h1 className='adminDelete' onClick={(e) => deleteItem2(e, tortaItem2)}>X</h1> : <></>}
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {tortasItems3.map((tortaItem3) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tortaItem3.itemIMG} className="sectionIMG" title={tortaItem3.itemIMG} name={tortaItem3.itemDesc} id={tortaItem3.itemPrice} alt={tortaItem3.itemName}/>
                    <h1 className='itemName'>{tortaItem3.itemName}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateName3(e, tortaItem3)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{tortaItem3.itemPrice}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice3(e, tortaItem3)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{tortaItem3.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc3(e, tortaItem3)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h2 className='adminRow'>Hilera: {tortaItem3.itemRow}</h2> : <></>}
                      {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateRow3(e, tortaItem3)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h1 className='adminDelete' onClick={(e) => deleteItem3(e, tortaItem3)}>X</h1> : <></>}
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

export default Tortas;
