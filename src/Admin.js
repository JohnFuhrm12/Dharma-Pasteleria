import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import {useState, useEffect} from 'react';

import {Image} from 'cloudinary-react';
import axios from "axios";

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

function Admin( {...props} ) {

  const [searchKey, setSearchKey] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [realUsername, setRealUsername] = useState('');
  const [realPassword, setRealPassword] = useState('');

  const [credentials, setCredentials] = useState([]);

  const [category, setCategory] = useState('tortas');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState(false);
  const [row, setRow] = useState('');

  const [imageUrl, setImageUrl] = useState();
  const [imageSelected, setImageSelected] = useState("");
  const [imageAwaiting, setImageAwaiting] = useState(false);

  const credentialsRef = collection(db, "admin");

  const getCredentials = async () => {
    const usernameRef = query(credentialsRef);
    const currentQuerySnapshot = await getDocs(usernameRef);
    setCredentials(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  const getReal = async () => {
    credentials.map((cred) => {
      setRealUsername(cred.username);
      setRealPassword(cred.password);
    });
  };

    useEffect(() => {     
        getCredentials();
        getReal();
    }, []);

    useEffect(() => {
      getReal();
    });

  function returnHome() {
    props.setAdminScreen(false);
    props.setHome(true);
  };

  function showCakes() {
    props.setAdminScreen(false);
    props.setCakesScreen(true);
  };

  function showTartas() {
    props.setAdminScreen(false);
    props.setTartasScreen(true);
  };

  function showSalado() {
    props.setAdminScreen(false);
    props.setSaladoScreen(true);
  };

  function showBudines() {
    props.setAdminScreen(false);
    props.setBudinesScreen(true);
  };

  function showOtros() {
    props.setAdminScreen(false);
    props.setOtrosScreen(true);
  };

  function showCart() {
    props.setCartScreen(true);
    props.setAdminScreen(false);
  };

  function login(e) {
    if (username === realUsername && password === realPassword) {
      props.setAdmin(true);
    }
    else {
      setError(true);
      e.preventDefault();
    };
  };

  function logout() {
    props.setAdmin(false);
    window.location.reload(false);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, category, name), {
      itemIMG: imageUrl,
      itemName: name,
      itemDesc: description,
      itemPrice: price,
      itemRow: Number(row),
    });
    setCategory('tortas');
    setName('');
    setDescription('');
    setPrice('');
    setRow('');
    setImageAwaiting(false);
  };

  // Uploads images to Cloudify database
  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "ReactDharma");

    axios.post("https://api.cloudinary.com/v1_1/dvmw658s9/image/upload", formData).then((response) => {
      console.log(response);
      setImageUrl(response.data.url);
    });

    console.log(imageUrl);

    setImageSelected("");
    setImageAwaiting(true);
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
      props.setSearchQuery(searchKey);
      props.setSearchScreen(true);
      props.setAdminScreen(false);
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
        {props.admin ? 
        <>
        <h1>Cerrar Sesión</h1>
        <button className='logoutButton' onClick={logout}>Cerrar Sesión</button> 
        <div className='adminAddWrapper'>
          <h1 className='adminAddTitle'>Agregar un Nuevo Producto:</h1>

          <label className='updateLabelAdmin' for="imageUpload">Foto de Producto:</label>
          <input name="imageUpload" type="file" onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}></input>
          <button className='uploadButton' onClick={uploadImage}>Subir</button>

          {imageAwaiting ? 
          <div>
                <form className='adminAddForm' onSubmit={addProduct}>
                  <label className='adminAddLabel' for="category">Categoría:</label>
                  <select className='adminInput' onChange={(e) => {setCategory(e.target.value)}} name="category">
                    <option value={'tortas'}>Tortas</option>
                    <option value={'tartas'}>Tartas</option>
                    <option value={'salado'}>Salado</option>
                    <option value={'budines'}>Budines</option>
                    <option value={'otros'}>Otros</option>
                  </select>   
      
                  <label className='adminAddLabel' for="name">Nombre:</label>
                  <input className='adminInput' onChange={(e) => {setName(e.target.value)}} name='name' value={name}/>
      
                  <label className='adminAddLabel' for="description">Descripción:</label>
                  <textarea className='adminInputDesc' onChange={(e) => {setDescription(e.target.value)}} name='description' value={description}/>
      
                  <label className='adminAddLabel' for="price">Precio:</label>
                  <input className='adminInput' onChange={(e) => {setPrice(e.target.value)}} name='price' value={price}/>
      
                  <label className='adminAddLabel' for="row">Hilera (1-3):</label>
                  <input className='adminInput' onChange={(e) => {setRow(e.target.value)}} name='row' value={row}/>
                  <button className='adminAddButton'>Agregar</button>
                </form>
              </div>
          : <></>}
        </div>
        </>
        :
        <>
        <h1>Acceso Administritivo</h1>
        {error ? <h1 className='errorMessage'>¡El nombre de usuario o contraseña son incorrectos!</h1> : <></>}
        <form onChange={() => {setError(false)}} onSubmit={login} className='AdminLoginForm'>
            <label className='username' for="username">Usuario:</label>
            <input onChange={(e) => {setUsername(e.target.value)}} className='usernameInput' name='username' value={username}></input>
            <label className='password' for="password">Contraseña:</label>
            <input onChange={(e) => {setPassword(e.target.value)}} className='passwordInput' name='username' value={password}></input>
            <button className='loginButton'>Acceder</button>
        </form>
        </>}
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

export default Admin;