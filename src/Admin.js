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

function Admin( {setHome, admin, setAdmin, setAdminScreen, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, setClientInfoScreen, cartAmount, currentUser} ) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [realUsername, setRealUsername] = useState('');
  const [realPassword, setRealPassword] = useState('');

  const [credentials, setCredentials] = useState([]);

  const [category, setCategory] = useState('tortas');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
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
    setAdminScreen(false);
    setHome(true);
  };

  function showCakes() {
    setAdminScreen(false);
    setCakesScreen(true);
  };

  function showTartas() {
    setAdminScreen(false);
    setTartasScreen(true);
  };

  function showSalado() {
    setAdminScreen(false);
    setSaladoScreen(true);
  };

  function showBudines() {
    setAdminScreen(false);
    setBudinesScreen(true);
  };

  function showOtros() {
    setAdminScreen(false);
    setOtrosScreen(true);
  };

  function login(e) {
    if (username === realUsername && password === realPassword) {
      setAdmin(true);
    }
    else {
      alert("Wrong Username or Password!");
      e.preventDefault();
    };
  };

  function logout() {
    setAdmin(false);
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
          <img src={cart} className="cart" alt="Carrito"/>
          <p className='cartQuantity'>{cartAmount}</p>
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
        {admin ? 
        <>
        <h1>Logout</h1>
        <button onClick={logout}>Log Out</button> 
        <div>
          <h1>Agregar un Nuevo Producto:</h1>

          <input type="file" onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}></input>
          <button onClick={uploadImage}>Upload</button>

          {imageAwaiting ? 
                  <form onSubmit={addProduct}>
                  <label for="category">Categoria</label>
                  <select onChange={(e) => {setCategory(e.target.value)}} name="category">
                    <option value={'tortas'}>Tortas</option>
                    <option value={'tartas'}>Tartas</option>
                    <option value={'salado'}>Salado</option>
                    <option value={'budines'}>Budines</option>
                    <option value={'otros'}>Otros</option>
                  </select>   
      
                  <label for="name">Nombre</label>
                  <input onChange={(e) => {setName(e.target.value)}} name='name' value={name}/>
      
                  <label for="description">Descripcion</label>
                  <input onChange={(e) => {setDescription(e.target.value)}} name='description' value={description}/>
      
                  <label for="price">Precio</label>
                  <input onChange={(e) => {setPrice(e.target.value)}} name='price' value={price}/>
      
                  <label for="row">Row</label>
                  <input onChange={(e) => {setRow(e.target.value)}} name='row' value={row}/>
                  <button>Agregar</button>
                </form>
          : <></>}
        </div>
        </>
        :
        <>
        <h1>Admin Log In</h1>
        <form onSubmit={login} className='AdminLoginForm'>
            <label className='username' for="username">Username:</label>
            <input onChange={(e) => {setUsername(e.target.value)}} className='usernameInput' name='username' value={username}></input>
            <label className='password' for="password">Password:</label>
            <input onChange={(e) => {setPassword(e.target.value)}} className='passwordInput' name='username' value={password}></input>
            <button>Login</button>
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