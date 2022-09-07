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

  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [iName, setIName] = useState('');
  const [row, setRow] = useState('');

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

  useEffect(() => {
    console.log(description);
  });

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

  // Admin Delete Item (3 needed for each row)
  const deleteItem = async (e, saladoItem) => {
    e.preventDefault();
    await deleteDoc(doc(db, "salado", saladoItem.id));
    getSalado();
  };

  const deleteItem2 = async (e, saladoItem2) => {
    e.preventDefault();
    await deleteDoc(doc(db, "salado", saladoItem2.id));
    getSalado();
  };

  const deleteItem3 = async (e, saladoItem3) => {
    e.preventDefault();
    await deleteDoc(doc(db, "salado", saladoItem3.id));
    getSalado();
  };

  // Admin Update Description
  const updateItemDesc = async (e, saladoItem) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem.id), {
      itemDesc: description,
    }, { merge: true });
    getSalado();
    setDescription('');
  };

  const updateItemDesc2 = async (e, saladoItem2) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem2.id), {
      itemDesc: description,
    }, { merge: true });
    getSalado();
    setDescription('');
  };

  const updateItemDesc3 = async (e, saladoItem3) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem3.id), {
      itemDesc: description,
    }, { merge: true });
    getSalado();
    setDescription('');
  };

  // Admin Update Price
  const updatePrice = async (e, saladoItem) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem.id), {
      itemPrice: price,
    }, { merge: true });
    getSalado();
    setPrice('');
  };

  const updatePrice2 = async (e, saladoItem2) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem2.id), {
      itemPrice: price,
    }, { merge: true });
    getSalado();
    setPrice('');
  };

  const updatePrice3 = async (e, saladoItem3) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem3.id), {
      itemPrice: price,
    }, { merge: true });
    getSalado();
    setPrice('');
  };

  // Admin Update Name
  const updateName = async (e, saladoItem) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem.id), {
      itemName: iName,
    }, { merge: true });
    getSalado();
    setIName('');
  };

  const updateName2 = async (e, saladoItem2) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem2.id), {
      itemName: iName,
    }, { merge: true });
    getSalado();
    setIName('');
  };

  const updateName3 = async (e, saladoItem3) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem3.id), {
      itemName: iName,
    }, { merge: true });
    getSalado();
    setIName('');
  };

  // Admin Update Row
  const updateRow = async (e, saladoItem) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem.id), {
      itemRow: Number(row),
    }, { merge: true });
    getSalado();
    setRow('');
  };

  const updateRow2 = async (e, saladoItem2) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem2.id), {
      itemRow: Number(row),
    }, { merge: true });
    getSalado();
    setRow('');
  };

  const updateRow3 = async (e, saladoItem3) => {
    e.preventDefault();
    await setDoc(doc(db, "salado", saladoItem3.id), {
      itemRow: Number(row),
    }, { merge: true });
    getSalado();
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
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updateName(e, saladoItem)}>
                        <label className='updateLabelAdmin' for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      <h1 className='itemPrice'>{saladoItem.itemPrice}</h1>
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice(e, saladoItem)}>
                        <label className='updateLabelAdmin'  for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? 
                      <>
                      <div className='itemDescAdminBox'>
                        <h2 className='itemDescAdmin'>{saladoItem.itemDesc}</h2>
                      </div>
                      <form onSubmit={(e) => updateItemDesc(e, saladoItem)}>
                        <label className='updateLabelAdmin'  for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h2 className='adminRow'>Hilera: {saladoItem.itemRow}</h2> : <></>}
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updateRow(e, saladoItem)}>
                        <label className='updateLabelAdmin'  for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h1 className='adminDelete' onClick={(e) => deleteItem(e, saladoItem)}>X</h1> : <></>}
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
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updateName2(e, saladoItem2)}>
                        <label for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      <h1 className='itemPrice'>{saladoItem2.itemPrice}</h1>
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice2(e, saladoItem2)}>
                        <label for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? 
                      <>
                      <h2>Desc: {saladoItem2.itemDesc}</h2>
                      <form onSubmit={(e) => updateItemDesc2(e, saladoItem2)}>
                        <label for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h2>Hilera: {saladoItem2.itemRow}</h2> : <></>}
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updateRow2(e, saladoItem2)}>
                        <label for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h1 onClick={(e) => deleteItem2(e, saladoItem2)}>X</h1> : <></>}
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
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updateName3(e, saladoItem3)}>
                        <label for="Name">Nombre:</label>
                        <input onChange={(e) => {setIName(e.target.value)}} name="Name" value={iName}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      <h1 className='itemPrice'>{saladoItem3.itemPrice}</h1>
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updatePrice3(e, saladoItem3)}>
                        <label for="Price">Precio:</label>
                        <input onChange={(e) => {setPrice(e.target.value)}} name="Price" value={price}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? 
                      <>
                      <h2>Desc: {saladoItem3.itemDesc}</h2>
                      <form onSubmit={(e) => updateItemDesc3(e, saladoItem3)}>
                        <label for="Desc">Descripción:</label>
                        <input onChange={(e) => {setDescription(e.target.value)}} name="Desc" value={description}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h2>Hilera: {saladoItem3.itemRow}</h2> : <></>}
                      {admin ? 
                      <>
                      <form onSubmit={(e) => updateRow3(e, saladoItem3)}>
                        <label for="Row">Hilera (1-3):</label>
                        <input onChange={(e) => {setRow(e.target.value)}} name="Row" value={row}></input>
                        <button>Actualizar</button>
                      </form>
                      </> : <></>}
                      {admin ? <h1 onClick={(e) => deleteItem3(e, saladoItem3)}>X</h1> : <></>}
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