import './App.css';
import {useState, useEffect} from 'react';

import cart from './static/cart.png';
import search from './static/search.png';

import axios from "axios";

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";

// Initialize Firebase Database
firebase.initializeApp({
  apiKey: "AIzaSyB5aeD3R-qHoRlLJcNGmrpCVZEocRz90Dk",
  authDomain: "reef-store-9da21.firebaseapp.com",
  projectId: "reef-store-9da21",
  storageBucket: "reef-store-9da21.appspot.com",
  messagingSenderId: "149895470839",
  appId: "1:149895470839:web:5937a7595ca8b696f17df2"
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

  const [category, setCategory] = useState('Soft Corals');
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
    props.setAdminScreen(false);
    props.setHome(true);
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
      alert("Wrong Username or Password!");
      e.preventDefault();
    };
  };

  function logout() {
    props.setAdmin(false);
    window.location.reload(false);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, 'products', name), {
      itemCategory: category,
      itemIMG: imageUrl,
      itemName: name,
      itemDesc: description,
      itemPrice: price,
      itemRow: Number(row),
    });
    setCategory('Soft Corals');
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
    formData.append("upload_preset", "ReactReef");

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
      <div className='titleBar'>
        <h1 className='titleName'>JF Aquatics</h1>
        <h1 className='catName' title="Soft Corals">Corals</h1>
        <h1 className='catName' title="Supplies">Supplies</h1>
        <h1 className='catName' title="Saltwater Fish">Fish</h1>
        <h1 className='catName' title="Invertebrates">Inverts</h1>
          <div className='searchCart'>
            <img src={search} className="search" alt="Search"/>
            <input onChange={(e) => {setSearchKey(e.target.value)}} onKeyDown={(e) => {searchFunc(e)}} className='searchBar' type="text" value={searchKey} placeholder="Search ..."/>
            <img src={cart} className="cart" alt="Carrito"/>
            <p className='cartQuantity'>{props.cartAmount}</p>
          </div>
      </div>
        {props.admin ? 
        <>
        <div>
        <h1>Logout</h1>
        <button className='logoutButton' onClick={logout}>Logout</button> 
        <div className='adminAddWrapper'>
          <h1 className='adminAddTitle'>Add a New Product:</h1>

          <label className='updateLabelAdmin' for="imageUpload">Product Image:</label>
          <input name="imageUpload" type="file" onChange={(event) => {
            setImageSelected(event.target.files[0]);
          }}></input>
          <button className='uploadButton' onClick={uploadImage}>Upload</button>

          {imageAwaiting ? 
          <div>
                <form className='adminAddForm' onSubmit={addProduct}>
                  <label className='adminAddLabel' for="category">Category:</label>
                  <select className='adminInput' onChange={(e) => {setCategory(e.target.value)}} name="category">
                    <option value={'Soft Corals'}>Soft Corals</option>
                    <option value={'Hard Corals'}>Hard Corals</option>
                    <option value={'Supplies'}>Supplies</option>
                    <option value={'Saltwater Fish'}>Saltwater Fish</option>
                    <option value={'Invertebrates'}>Invertebrates</option>
                  </select>   
      
                  <label className='adminAddLabel' for="name">Name:</label>
                  <input className='adminInput' onChange={(e) => {setName(e.target.value)}} name='name' value={name}/>
      
                  <label className='adminAddLabel' for="description">Description:</label>
                  <textarea className='adminInputDesc' onChange={(e) => {setDescription(e.target.value)}} name='description' value={description}/>
      
                  <label className='adminAddLabel' for="price">Price:</label>
                  <input className='adminInput' onChange={(e) => {setPrice(e.target.value)}} name='price' value={price}/>
      
                  <label className='adminAddLabel' for="row">Row (1-3):</label>
                  <input className='adminInput' onChange={(e) => {setRow(e.target.value)}} name='row' value={row}/>
                  <button className='adminAddButton'>Add</button>
                </form>
              </div>
          : <></>}
        </div>
        </div>
        </>
        :
        <>
        <h1>Admin Login</h1>
        <form onSubmit={login} className='AdminLoginForm'>
            <label className='username' for="username">User:</label>
            <input onChange={(e) => {setUsername(e.target.value)}} className='usernameInput' name='username' value={username}></input>
            <label className='password' for="password">Password:</label>
            <input onChange={(e) => {setPassword(e.target.value)}} className='passwordInput' name='username' value={password}></input>
            <button className='loginButton'>Login</button>
        </form>
        </>}
    </div>
    </>
  );
}

export default Admin;