import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import miniTarteletas from './static/miniTarteletas.png';
import Ricota from './static/tartadeRicota.png';

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

function Tartas( {...props} ) {

  const [searchKey, setSearchKey] = useState('');

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [iName, setIName] = useState('');
  const [row, setRow] = useState('');

  const [tartasItems, setTartasItems] = useState([]);
  const [tartasItems2, setTartasItems2] = useState([]);
  const [tartasItems3, setTartasItems3] = useState([]);
  const tartasRef = collection(db, "tartas");

  const getTartas = async () => {
    const itemsRef = query(tartasRef, where('itemRow', '==', 1));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setTartasItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef2 = query(tartasRef, where('itemRow', '==', 2));
    const currentQuerySnapshot2 = await getDocs(itemsRef2);
    setTartasItems2(currentQuerySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef3 = query(tartasRef, where('itemRow', '==', 3));
    const currentQuerySnapshot3 = await getDocs(itemsRef3);
    setTartasItems3(currentQuerySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

    useEffect(() => {
      props.getDbmessages();
      getTartas();
    }, []);

    function returnHome() {
      props.setTartasScreen(false);
      props.setHome(true);
      };


    function showTortas() {
      props.setTartasScreen(false);
      props.setCakesScreen(true);
    };

    function showSalado() {
      props.setTartasScreen(false);
      props.setSaladoScreen(true);
  };

    function showBudines() {
      props.setTartasScreen(false);
      props.setBudinesScreen(true);
  };

  function showOtros() {
    props.setTartasScreen(false);
    props.setOtrosScreen(true);
};

function goToProduct(e) {
  props.setTartasScreen(false);
  props.setProductScreen(true);
  props.setCurrentSection('Tartas');
  props.setProductImage(e.currentTarget.title);
  props.setProductName(e.currentTarget.alt);
  props.setProductPrice(e.currentTarget.id);
  props.setProductDesc(e.currentTarget.name);
};

function showCart() {
  props.setCartScreen(true);
  props.setTartasScreen(false);
};

function searchFunc(e) {
  if(e.key === 'Enter') {
    props.setSearchQuery(searchKey);
    props.setSearchScreen(true);
    props.setTartasScreen(false);
  };
};

 // Admin Delete Item (3 needed for each row)
 const deleteItem = async (e, tartaItem) => {
  e.preventDefault();
  await deleteDoc(doc(db, "tartas", tartaItem.id));
  getTartas();
};

const deleteItem2 = async (e, tartaItem2) => {
  e.preventDefault();
  await deleteDoc(doc(db, "tartas", tartaItem2.id));
  getTartas();
};

const deleteItem3 = async (e, tartaItem3) => {
  e.preventDefault();
  await deleteDoc(doc(db, "tartas", tartaItem3.id));
  getTartas();
};

// Admin Update Description
const updateItemDesc = async (e, tartaItem) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem.id), {
    itemDesc: description,
  }, { merge: true });
  getTartas();
  setDescription('');
};

const updateItemDesc2 = async (e, tartaItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem2.id), {
    itemDesc: description,
  }, { merge: true });
  getTartas();
  setDescription('');
};

const updateItemDesc3 = async (e, tartaItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem3.id), {
    itemDesc: description,
  }, { merge: true });
  getTartas();
  setDescription('');
};

// Admin Update Price
const updatePrice = async (e, tartaItem) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem.id), {
    itemPrice: price,
  }, { merge: true });
  getTartas();
  setPrice('');
};

const updatePrice2 = async (e, tartaItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem2.id), {
    itemPrice: price,
  }, { merge: true });
  getTartas();
  setPrice('');
};

const updatePrice3 = async (e, tartaItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem3.id), {
    itemPrice: price,
  }, { merge: true });
  getTartas();
  setPrice('');
};

// Admin Update Name
const updateName = async (e, tartaItem) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem.id), {
    itemName: iName,
  }, { merge: true });
  getTartas();
  setIName('');
};

const updateName2 = async (e, tartaItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem2.id), {
    itemName: iName,
  }, { merge: true });
  getTartas();
  setIName('');
};

const updateName3 = async (e, tartaItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem3.id), {
    itemName: iName,
  }, { merge: true });
  getTartas();
  setIName('');
};

// Admin Update Row
const updateRow = async (e, tartaItem) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem.id), {
    itemRow: Number(row),
  }, { merge: true });
  getTartas();
  setRow('');
};

const updateRow2 = async (e, tartaItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem2.id), {
    itemRow: Number(row),
  }, { merge: true });
  getTartas();
  setRow('');
};

const updateRow3 = async (e, tartaItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "tartas", tartaItem3.id), {
    itemRow: Number(row),
  }, { merge: true });
  getTartas();
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
          <h2 onClick={showTortas}>TORTAS</h2>
          <h2>TARTAS</h2>
          <h2 onClick={showSalado}>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2 onClick={showOtros}>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Tartas</h2>
      </div>
      <h1 className='sectionTitle'>LAS TARTAS</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
        {tartasItems.map((tartaItem) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tartaItem.itemIMG} className="sectionIMG" title={tartaItem.itemIMG} name={tartaItem.itemDesc} id={tartaItem.itemPrice} alt={tartaItem.itemName}/>
                    <h1 className='itemName'>{tartaItem.itemName}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateName(e, tartaItem)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{tartaItem.itemPrice}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice(e, tartaItem)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{tartaItem.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc(e, tartaItem)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h2 className='adminRow'>Hilera: {tartaItem.itemRow}</h2> : <></>}
                      {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateRow(e, tartaItem)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h1 className='adminDelete' onClick={(e) => deleteItem(e, tartaItem)}>X</h1> : <></>}
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {tartasItems2.map((tartaItem2) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tartaItem2.itemIMG} className="sectionIMG" title={tartaItem2.itemIMG} name={tartaItem2.itemDesc} id={tartaItem2.itemPrice} alt={tartaItem2.itemName}/>
                    <h1 className='itemName'>{tartaItem2.itemName}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateName2(e, tartaItem2)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{tartaItem2.itemPrice}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice2(e, tartaItem2)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{tartaItem2.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc2(e, tartaItem2)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h2 className='adminRow'>Hilera: {tartaItem2.itemRow}</h2> : <></>}
                      {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateRow2(e, tartaItem2)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h1 className='adminDelete' onClick={(e) => deleteItem2(e, tartaItem2)}>X</h1> : <></>}
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {tartasItems3.map((tartaItem3) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={tartaItem3.itemIMG} className="sectionIMG" title={tartaItem3.itemIMG} name={tartaItem3.itemDesc} id={tartaItem3.itemPrice} alt={tartaItem3.itemName}/>
                    <h1 className='itemName'>{tartaItem3.itemName}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateName3(e, tartaItem3)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{tartaItem3.itemPrice}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice3(e, tartaItem3)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{tartaItem3.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc3(e, tartaItem3)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h2 className='adminRow'>Hilera: {tartaItem3.itemRow}</h2> : <></>}
                      {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateRow3(e, tartaItem3)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h1 className='adminDelete' onClick={(e) => deleteItem3(e, tartaItem3)}>X</h1> : <></>}
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

export default Tartas;