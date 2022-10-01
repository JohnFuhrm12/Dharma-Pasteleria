import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import alfajores from './static/alfajores.png';
import cakePaletas from './static/cakePaletas.png';
import rolls from './static/rolls.png';
import trufas from './static/trufas.png';
import donas from './static/donas.png';

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

function Otros( {...props} ) {

  const [searchKey, setSearchKey] = useState('');

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [iName, setIName] = useState('');
  const [row, setRow] = useState('');

  const [otrosItems, setOtrosItems] = useState([]);
  const [otrosItems2, setOtrosItems2] = useState([]);
  const [otrosItems3, setOtrosItems3] = useState([]);
  const otrosRef = collection(db, "otros");

  const getOtros = async () => {
    const itemsRef = query(otrosRef, where('itemRow', '==', 1));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setOtrosItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef2 = query(otrosRef, where('itemRow', '==', 2));
    const currentQuerySnapshot2 = await getDocs(itemsRef2);
    setOtrosItems2(currentQuerySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id})));

    const itemsRef3 = query(otrosRef, where('itemRow', '==', 3));
    const currentQuerySnapshot3 = await getDocs(itemsRef3);
    setOtrosItems3(currentQuerySnapshot3.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  useEffect(() => {
    props.getDbmessages();
    getOtros();
  }, []);

  function returnHome() {
    props.setOtrosScreen(false);
    props.setHome(true);
  };

  function showCakes() {
    props.setOtrosScreen(false);
    props.setCakesScreen(true);
  };

  function showTartas() {
    props.setOtrosScreen(false);
    props.setTartasScreen(true);
  };

  function showSalado() {
    props.setOtrosScreen(false);
    props.setSaladoScreen(true);
  };

  function showBudines() {
    props.setOtrosScreen(false);
    props.setBudinesScreen(true);
  };

  function goToProduct(e) {
    props.setOtrosScreen(false);
    props.setProductScreen(true);
    props.setCurrentSection('Otros');
    props.setProductImage(e.currentTarget.title);
    props.setProductName(e.currentTarget.alt);
    props.setProductPrice(e.currentTarget.id);
    props.setProductDesc(e.currentTarget.name);
  };

  function showCart() {
    props.setCartScreen(true);
    props.setOtrosScreen(false);
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
      props.setSearchQuery(searchKey);
      props.setSearchScreen(true);
      props.setOtrosScreen(false);
    };
  };

  // props.admin Delete Item (3 needed for each row)
 const deleteItem = async (e, otroItem) => {
  e.preventDefault();
  await deleteDoc(doc(db, "otros", otroItem.id));
  getOtros();
};

const deleteItem2 = async (e, otroItem2) => {
  e.preventDefault();
  await deleteDoc(doc(db, "otros", otroItem2.id));
  getOtros();
};

const deleteItem3 = async (e, otroItem3) => {
  e.preventDefault();
  await deleteDoc(doc(db, "otros", otroItem3.id));
  getOtros();
};

// props.admin Update Description
const updateItemDesc = async (e, otroItem) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem.id), {
    itemDesc: description,
  }, { merge: true });
  getOtros();
  setDescription('');
};

const updateItemDesc2 = async (e, otroItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem2.id), {
    itemDesc: description,
  }, { merge: true });
  getOtros();
  setDescription('');
};

const updateItemDesc3 = async (e, otroItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem3.id), {
    itemDesc: description,
  }, { merge: true });
  getOtros();
  setDescription('');
};

// props.admin Update Price
const updatePrice = async (e, otroItem) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem.id), {
    itemPrice: price,
  }, { merge: true });
  getOtros();
  setPrice('');
};

const updatePrice2 = async (e, otroItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem2.id), {
    itemPrice: price,
  }, { merge: true });
  getOtros();
  setPrice('');
};

const updatePrice3 = async (e, otroItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem3.id), {
    itemPrice: price,
  }, { merge: true });
  getOtros();
  setPrice('');
};

// props.admin Update Name
const updateName = async (e, otroItem) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem.id), {
    itemName: iName,
  }, { merge: true });
  getOtros();
  setIName('');
};

const updateName2 = async (e, otroItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem2.id), {
    itemName: iName,
  }, { merge: true });
  getOtros();
  setIName('');
};

const updateName3 = async (e, otroItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem3.id), {
    itemName: iName,
  }, { merge: true });
  getOtros();
  setIName('');
};

// props.admin Update Row
const updateRow = async (e, otroItem) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem.id), {
    itemRow: Number(row),
  }, { merge: true });
  getOtros();
  setRow('');
};

const updateRow2 = async (e, otroItem2) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem2.id), {
    itemRow: Number(row),
  }, { merge: true });
  getOtros();
  setRow('');
};

const updateRow3 = async (e, otroItem3) => {
  e.preventDefault();
  await setDoc(doc(db, "otros", otroItem3.id), {
    itemRow: Number(row),
  }, { merge: true });
  getOtros();
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
          <h2 onClick={showCakes}>TORTAS</h2>
          <h2 onClick={showTartas}>TARTAS</h2>
          <h2 onClick={showSalado}>SALADO</h2>
          <h2 onClick={showBudines}>BUDINES</h2>
          <h2>OTROS</h2>
        </div>
      </div>
      <div className='sectionBar'>
        <h2 onClick={returnHome} className='sectionHeadingHome'>Inicio</h2>
        <h2 className='sectionHeading'>/</h2>
        <h2 className='sectionHeading'>Otros</h2>
      </div>
      <h1 className='sectionTitle'>Los Otros</h1>
      <div className='sectionImages'>
        <div className='sectionImagesTop'>
        {otrosItems.map((otroItem) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={otroItem.itemIMG} className="sectionIMG" title={otroItem.itemIMG} name={otroItem.itemDesc} id={otroItem.itemPrice} alt={otroItem.itemName}/>
                    <h1 className='itemName'>{otroItem.itemName}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateName(e, otroItem)}>
                        <label className='updateLabelprops.admin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{otroItem.itemPrice}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice(e, otroItem)}>
                        <label className='updateLabelprops.admin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? 
                      <>
                      <div className='itemDescprops.adminBox'>
                        <h2 className='itemDescprops.admin'>{otroItem.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc(e, otroItem)}>
                        <label className='updateLabelprops.admin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h2 className='props.adminRow'>Hilera: {otroItem.itemRow}</h2> : <></>}
                      {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateRow(e, otroItem)}>
                        <label className='updateLabelprops.admin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h1 className='props.adminDelete' onClick={(e) => deleteItem(e, otroItem)}>X</h1> : <></>}
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {otrosItems2.map((otroItem2) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={otroItem2.itemIMG} className="sectionIMG" title={otroItem2.itemIMG} name={otroItem2.itemDesc} id={otroItem2.itemPrice} alt={otroItem2.itemName}/>
                    <h1 className='itemName'>{otroItem2.itemName}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateName2(e, otroItem2)}>
                        <label className='updateLabelprops.admin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{otroItem2.itemPrice}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice2(e, otroItem2)}>
                        <label className='updateLabelprops.admin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? 
                      <>
                      <div className='itemDescprops.adminBox'>
                        <h2 className='itemDescprops.admin'>{otroItem2.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc2(e, otroItem2)}>
                        <label className='updateLabelprops.admin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h2 className='props.adminRow'>Hilera: {otroItem2.itemRow}</h2> : <></>}
                      {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateRow2(e, otroItem2)}>
                        <label className='updateLabelprops.admin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h1 className='props.adminDelete' onClick={(e) => deleteItem2(e, otroItem2)}>X</h1> : <></>}
                  </div>
          )
        })}
        </div>
        <div className='sectionImagesBottom'>
        {otrosItems3.map((otroItem3) => {
          return (
                  <div>
                    <img onClick={goToProduct} src={otroItem3.itemIMG} className="sectionIMG" title={otroItem3.itemIMG} name={otroItem3.itemDesc} id={otroItem3.itemPrice} alt={otroItem3.itemName}/>
                    <h1 className='itemName'>{otroItem3.itemName}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateName3(e, otroItem3)}>
                        <label className='updateLabelprops.admin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                    <h1 className='itemPrice'>{otroItem3.itemPrice}</h1>
                    {props.admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice3(e, otroItem3)}>
                        <label className='updateLabelprops.admin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? 
                      <>
                      <div className='itemDescprops.adminBox'>
                        <h2 className='itemDescprops.admin'>{otroItem3.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc3(e, otroItem3)}>
                        <label className='updateLabelprops.admin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h2 className='props.adminRow'>Hilera: {otroItem3.itemRow}</h2> : <></>}
                      {props.admin ? 
                      <>
                      <form onSubmit={(e) => updateRow3(e, otroItem3)}>
                        <label className='updateLabelprops.admin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {props.admin ? <h1 className='props.adminDelete' onClick={(e) => deleteItem3(e, otroItem3)}>X</h1> : <></>}
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

export default Otros;