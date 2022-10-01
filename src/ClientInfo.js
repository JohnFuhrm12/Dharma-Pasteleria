import './App.css';

import vegan from './static/vegan.png';
import instagram from './static/instagram.webp'; 
import cart from './static/cart.png';
import search from './static/search.png';

import {useState, useEffect} from 'react';

// Paypal Imports
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 

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

function ClientInfo( {...props} ) {

  const [searchKey, setSearchKey] = useState('');

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
  Teléfono: ${phone}
  Dirección: ${streetName}, ${cityName}, ${postalCode}
  
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

  var id = Math.random().toString(16).slice(2);

  const getDbmessages = async () => {
    const itemsRef = query(cartRef, where('user', '==', props.currentUser));
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

  function returnHome() {
    props.setClientInfoScreen(false);
    props.setHome(true);
  };

  function showCakes() {
    props.setClientInfoScreen(false);
    props.setCakesScreen(true);
  };

  function showTartas() {
    props.setClientInfoScreen(false);
    props.setTartasScreen(true);
  };

  function showSalado() {
    props.setClientInfoScreen(false);
    props.setSaladoScreen(true);
  };

  function showBudines() {
    props.setClientInfoScreen(false);
    props.setBudinesScreen(true);
  };

  function showOtros() {
    props.setClientInfoScreen(false);
    props.setOtrosScreen(true);
  };

  function showCart() {
    props.setCartScreen(true);
    props.setClientInfoScreen(false);
  };

  function searchFunc(e) {
    if(e.key === 'Enter') {
      props.setSearchQuery(searchKey);
      props.setSearchScreen(true);
      props.setClientInfoScreen(false);
    };
  };

  const createOrder = async (e) => {
    await setDoc(doc(db, 'orders', id), {
      clientName: `${clientFirstName} ${clientLastName}`,
      clientNumber: phone,
      clientEmail: emailName,
      clientAddress: `${streetName}, ${buildingName}, ${cityName} ${postalCode}, ${countryName}`,
      orderProducts: props.cartItems.map((cartItem) => {
        return cartItem.itemQuantity + 'x' + ' ' + cartItem.itemName + ' ';
      }),
      orderTotal: `$${newSum.toFixed(2)}`,
      paymentMethod: payment,
      orderNumber: id,
      orderStatus: 'Pendiente',
      orderType: service,
    });
    props.setCurrentOrder(id);
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
      {firstPage ? <h1>Datos de Facturación</h1> : <></>}
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
            <label className='clientInfoLabel' for="PostalCode">Código Postal:</label>
            <input onChange={(e) => {setPostalCode(e.target.value)}} className='clientInfoInput' name='PostalCode' value={postalCode} required></input>
            <label className='clientInfoLabel' for="Phone">Teléfono:</label>
            <input onChange={(e) => {setPhone(e.target.value)}} className='clientInfoInput' name='Phone' value={phone} required></input>
            <label className='clientInfoLabel' for="Payment">Método del Pago:</label>
            <select onChange={(e) => {setPayment(e.target.value)}} className='clientInfoInput' name="Payment" id="Payment">
              <option value={'Efectivo'}>Efectivo</option>
              <option value={'Tarjeta'}>Tarjeta</option>
            </select>     
        </div>
        <div className='secondInfoColumn'>
            <label className='clientInfoLabel' for="LastName">Apellido:</label>
            <input onChange={(e) => {setClientLastName(e.target.value)}} className='clientInfoInput' name='LastName' value={clientLastName} required></input>
            <label className='clientInfoLabel' for="Country">País:</label>
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
            <h2 className='clientDetail'>Dirección: {streetName}, {cityName}, {postalCode}</h2>
            <h2 className='clientDetail'>Apartamento: {buildingName}</h2>
            <h2 className='clientDetail'>Teléfono: {phone}</h2>
            <h2 className='clientDetail'>Correo: {emailName}</h2>
            <h2 className='clientDetail'>Método del Pago: {payment}</h2>
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
      <button onClick={() => {setFirstPage(true)}} className='procedeButtonClientInfo'>Atrás</button>
      {payment === 'Efectivo' ? <a target="_blank" href={`https://wa.me/5491159061461?text=${message}`}><button className='procedeButtonClientInfo'>Enviar Pedido</button></a> : <></>}
      <div className='paypal'>
      {payment === 'Tarjeta' ?
      <PayPalScriptProvider options={{ "client-id": "test"}}>
        <PayPalButtons
            style={{ layout: "vertical", color: "blue", shape: "rect" }}
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: props.paypalTotal,
                            },
                        },
                    ],
                });
            }}
            onApprove={(data, actions) => {
              props.setClientInfoScreen(false);
              props.setPaymentComplete(true);
              createOrder();
            }}
        />;
      </PayPalScriptProvider>
       : <></>}
      </div>
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

export default ClientInfo;