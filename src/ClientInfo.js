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

function ClientInfo( {setHome, setCakesScreen, setTartasScreen, setSaladoScreen, setBudinesScreen, setOtrosScreen, setClientInfoScreen, cartAmount, currentUser} ) {

  const [clientFirstName, setClientFirstName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('Effectivo');

  const [clientLastName, setClientLastName] = useState('');
  const [countryName, setCountryName] = useState('Argentina');
  const [buildingName, setBuildingName] = useState('');
  const [cityName, setCityName] = useState('');
  const [emailName, setEmailName] = useState('');
  const [service, setService] = useState('Domicilio');

  const [firstPage, setFirstPage] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [newSum, setNewSum] = useState(0);
  const totals = [];
  const cartRef = collection(db, "cart");

  const message = `Hola! Vengo de https://dharmapasteleria.netlify.app/.  
  Tipo de Servicio: ${service}
  
  Nombre: ${clientFirstName}${clientLastName}
  Tel??fono: ${phone}
  Direcci??n: ${streetName}, ${cityName}, ${postalCode}
  
  Metodo del pago: ${payment}
  Estado del pago: No Pagado
  
  Costos:
  Costo de los productos: $${newSum}
  Costo de entrega: Por Confirmar
  Total a pagar: $${newSum}
  
  Pedido:
  ${cartItems.map((cartItem) => {
    return (cartItem.itemName + ' ' + 'x' + cartItem.itemQuantity + ' $' + cartItem.itemPrice);
  })}

  Punto de Retiro Para Llevar: Dr. Amadeo Sabattini 4545, B1678 Caseros, Provincia de Buenos Aires, Argentina.
  Tiempo hasta que sale un domicilio: 24 horas.
  
  Te atenderemos enseguida!`;

  let sum = 0;

  const getDbmessages = async () => {
    const itemsRef = query(cartRef, where('user', '==', currentUser));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setCartItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  function getTotal() {
    cartItems.map((cartItem) => {
      totals.push(cartItem.itemPrice * cartItem.itemQuantity)
    })

    totals.forEach(item => {
      sum += item;
    });

    setNewSum(sum)
  };

    useEffect(() => {     
        getDbmessages();
        getTotal();
    }, []);

    setTimeout( function() { getTotal(); }, 1000);

  useEffect(() => {
    console.log(clientFirstName);
    console.log(businessName);
    console.log(streetName);
    console.log(postalCode);
    console.log(phone);
    console.log(clientLastName);
    console.log(countryName);
    console.log(buildingName);
    console.log(cityName);
    console.log(emailName);
  });

  function returnHome() {
    setClientInfoScreen(false);
    setHome(true);
  };

  function showCakes() {
    setClientInfoScreen(false);
    setCakesScreen(true);
  };

  function showTartas() {
    setClientInfoScreen(false);
    setTartasScreen(true);
  };

  function showSalado() {
    setClientInfoScreen(false);
    setSaladoScreen(true);
  };

  function showBudines() {
    setClientInfoScreen(false);
    setBudinesScreen(true);
  };

  function showOtros() {
    setClientInfoScreen(false);
    setOtrosScreen(true);
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
        <h1 onClick={returnHome} className='title'>Dharma Pasteler??a</h1>
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
      {firstPage ? <h1>Datos de Facturaci??n</h1> : <></>}
      {firstPage ? 
      <>
      <form onSubmit={() => {setFirstPage(false)}}>
      <div className='clientInfoBox'>
        <div className='firstInfoColumn'>
            <label className='clientInfoLabel' for="Name">Nombre:</label>
            <input onChange={(e) => {setClientFirstName(e.target.value)}} className='clientInfoInput' name='Name' value={clientFirstName} required></input>
            <label className='clientInfoLabel' for="Business">Empresa (Opcional):</label>
            <input onChange={(e) => {setBusinessName(e.target.value)}} className='clientInfoInput' name='Business' value={businessName}></input>
            <label className='clientInfoLabel' for="Street">Calle:</label>
            <input onChange={(e) => {setStreetName(e.target.value)}} className='clientInfoInput' name='Street' value={streetName} required></input>
            <label className='clientInfoLabel' for="PostalCode">C??digo Postal:</label>
            <input onChange={(e) => {setPostalCode(e.target.value)}} className='clientInfoInput' name='PostalCode' value={postalCode} required></input>
            <label className='clientInfoLabel' for="Phone">Tel??fono:</label>
            <input onChange={(e) => {setPhone(e.target.value)}} className='clientInfoInput' name='Phone' value={phone} required></input>
            <label className='clientInfoLabel' for="Payment">M??todo del Pago:</label>
            <input onChange={(e) => {setPayment(e.target.value)}} className='clientInfoInput' name='Payment' value={'Effectivo'} required></input>
        </div>
        <div className='secondInfoColumn'>
            <label className='clientInfoLabel' for="LastName">Apellido:</label>
            <input onChange={(e) => {setClientLastName(e.target.value)}} className='clientInfoInput' name='LastName' value={clientLastName} required></input>
            <label className='clientInfoLabel' for="Country">Pa??s:</label>
            <input onChange={(e) => {setCountryName(e.target.value)}} className='clientInfoInput' name='Country' value={'Argentina'}></input>       
            <label className='clientInfoLabel' for="Building">Apartamento/Unidad:</label>
            <input onChange={(e) => {setBuildingName(e.target.value)}} className='clientInfoInput' name='Building' value={buildingName} required></input>    
            <label className='clientInfoLabel' for="City">Ciudad:</label>
            <input onChange={(e) => {setCityName(e.target.value)}} className='clientInfoInput' name='City' value={cityName} required></input>    
            <label className='clientInfoLabel' for="Email">Correo:</label>
            <input onChange={(e) => {setEmailName(e.target.value)}} className='clientInfoInput' name='Email' value={emailName} required></input>
            <label className='clientInfoLabel' for="Service">Tipo de Servicio:</label>
            <select onChange={(e) => {setService(e.target.value)}} className='clientInfoInput' name="Service" id="Service">
              <option value={'Domicilio'}>Domicilio</option>
              <option value={'Para Llevar'}>Para Llevar</option>
            </select>             
        </div>
      </div>
      <button type='submit' className='procedeButtonClientInfo'>Seguir</button>
      </form>
      </>
      : 
      <>
      <div className='clientInfoBoxDetails'>
      <h1 className='infoHeader'>Sus Detalles</h1>
        <div className='clientDetails'>
            <h2 className='clientDetail'>Nombre: {clientFirstName} {clientLastName}</h2>
            {businessName ? <h2 className='clientDetail'>Empresa: {businessName}</h2> : <></>}
            <h2 className='clientDetail'>Direcci??n: {streetName}, {cityName}, {postalCode}</h2>
            <h2 className='clientDetail'>Apartamento: {buildingName}</h2>
            <h2 className='clientDetail'>Tel??fono: {phone}</h2>
            <h2 className='clientDetail'>Correo: {emailName}</h2>
            <h2 className='clientDetail'>M??todo del Pago: {payment}</h2>
            <h2 className='clientDetail'>Tipo de Servicio: {service}</h2>
        </div>
      <h1 className='infoHeader'>Su Orden</h1>
      <div className='detailsHeaders'>
        <h1>Producto</h1>
        <h1>Total Parcial</h1>
      </div>
      {cartItems.map((cartItem) => {
          return (
            <>
            <div className='summaryItems'>
                <div className='nameQuantity'>
                    <h1>{cartItem.itemName}</h1>
                    <h1>x{cartItem.itemQuantity}</h1>
                </div>
                <h1>${cartItem.itemPrice * cartItem.itemQuantity}</h1>
            </div>
            </>
          )
        })}
      </div>
      <div className='clientDetailsTotalBox'>
        <h1 className='clientDetailsTotal'>Total</h1>
      </div>
      <h1>${newSum}</h1>
      <button onClick={() => {setFirstPage(true)}} className='procedeButtonClientInfo'>Atr??s</button>
      <a href={`https://wa.me/5491159061461?text=${message}`}><button className='procedeButtonClientInfo'>Proceder al Pago</button></a>
      </>}
        <div className='footer'>
          <h1>Dharma Pasteler??a</h1>
          <div className='footerInsta'>
            <h1>Seguinos en Instagram:</h1>
            <a href='https://www.instagram.com/dharma.pasteleria/'><img src={instagram} className="instagram" alt="Instagram"/></a>
          </div>
        </div>
    </div>
    </>
  );
}

export default ClientInfo;