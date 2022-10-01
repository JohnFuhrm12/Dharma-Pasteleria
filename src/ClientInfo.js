import './App.css';
import {useState, useEffect} from 'react';

import cart from './static/cart.png';
import search from './static/search.png';

import coralHome from './static/coralHome.jpg';

// Paypal Imports
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"; 

// Firebase imports
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { collection, doc, setDoc, deleteDoc, getDocs, query, where, limit } from "firebase/firestore";
import userEvent from '@testing-library/user-event';

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

function ClientInfo( {...props} ) {

  const [searchKey, setSearchKey] = useState('');

  const [clientFirstName, setClientFirstName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [streetName, setStreetName] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phone, setPhone] = useState('');

  const [clientLastName, setClientLastName] = useState('');
  const [countryName, setCountryName] = useState('United States');
  const [buildingName, setBuildingName] = useState('');
  const [cityName, setCityName] = useState('');
  const [emailName, setEmailName] = useState('');

  const [firstPage, setFirstPage] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [newSum, setNewSum] = useState(0);
  const totals = [];
  const cartRef = collection(db, "cart");

  let sum = 0;

  var id = Math.random().toString(16).slice(2);

  const getDbmessages = async () => {
    const itemsRef = query(cartRef, where('user', '==', props.currentUser));
    const currentQuerySnapshot = await getDocs(itemsRef);
    setCartItems(currentQuerySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id})));
  };

  function getTotal() {
    props.cartItems.map((cartItem) => {
      totals.push(cartItem.itemPrice * cartItem.itemQuantity)
    });

    totals.forEach(item => {
      sum += item;
    });

    setNewSum(sum);
  };

    useEffect(() => {     
        props.getDbmessages();
        getTotal();
    }, []);

    setTimeout( function() { getTotal(); }, 1000);

  function returnHome() {
    props.setClientInfoScreen(false);
    props.setHome(true);
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

  function showProductSelection(e) {
    props.setClientInfoScreen(false);
    props.setProductSelectionCategory(e.currentTarget.title);
    props.setProductSelectionScreen(true);
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
        paymentMethod: 'Paypal/Card',
        orderNumber: id,
        orderStatus: 'Pending Delivery',
      });
      props.setCurrentOrder(id);
  };

  return (
    <>
    <div className="page">
    <div className='titleBar'>
            <h1 className='titleName' onClick={returnHome} >JF Aquatics</h1>
            <h1 onClick={showProductSelection} title="Soft Corals" className='catName'>Corals</h1>
            <h1 onClick={showProductSelection} title="Supplies" className='catName'>Supplies</h1>
            <h1 onClick={showProductSelection} title="Saltwater Fish" className='catName'>Fish</h1>
            <h1 onClick={showProductSelection} title="Invertebrates" className='catName'>Inverts</h1>
          <div className='searchCart'>
            <img src={search} className="search" alt="Search"/>
            <input onChange={(e) => {setSearchKey(e.target.value)}} onKeyDown={(e) => {searchFunc(e)}} className='searchBar' type="text" value={searchKey} placeholder="Search ..."/>
            <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
            <p className='cartQuantity'>{props.cartAmount}</p>
          </div>
      </div>
      {firstPage ? <div className='sectionBar'>
        <h2 className='sectionHeading'>Billing Information</h2>
      </div> : <></>}
      {firstPage ? 
      <>
      <form onSubmit={() => {setFirstPage(false)}}>
      <div className='clientInfoBox'>
        <div className='firstInfoColumn'>
            <label className='clientInfoLabel' for="Name">Name:</label>
            <input onChange={(e) => {setClientFirstName(e.target.value)}} className='clientInfoInput' name='Name' value={clientFirstName} required></input>
            <label className='clientInfoLabel' for="Business">Business (Optional):</label>
            <input onChange={(e) => {setBusinessName(e.target.value)}} className='clientInfoInput' name='Business' value={businessName}></input>
            <label className='clientInfoLabel' for="Street">Street:</label>
            <input onChange={(e) => {setStreetName(e.target.value)}} className='clientInfoInput' name='Street' value={streetName} required></input>
            <label className='clientInfoLabel' for="PostalCode">Postal Code:</label>
            <input onChange={(e) => {setPostalCode(e.target.value)}} className='clientInfoInput' name='PostalCode' value={postalCode} required></input>
            <label className='clientInfoLabel' for="Phone">Phone:</label>
            <input onChange={(e) => {setPhone(e.target.value)}} className='clientInfoInput' name='Phone' value={phone} required></input> 
        </div>
        <div className='secondInfoColumn'>
            <label className='clientInfoLabel' for="LastName">Last Name:</label>
            <input onChange={(e) => {setClientLastName(e.target.value)}} className='clientInfoInput' name='LastName' value={clientLastName} required></input>
            <label className='clientInfoLabel' for="Country">Country:</label>
            <input onChange={(e) => {setCountryName(e.target.value)}} className='clientInfoInput' name='Country' value={'United States'}></input>       
            <label className='clientInfoLabel' for="Building">Apartment:</label>
            <input onChange={(e) => {setBuildingName(e.target.value)}} className='clientInfoInput' name='Building' value={buildingName} required></input>    
            <label className='clientInfoLabel' for="City">City:</label>
            <input onChange={(e) => {setCityName(e.target.value)}} className='clientInfoInput' name='City' value={cityName} required></input>    
            <label className='clientInfoLabel' for="Email">Email:</label>
            <input onChange={(e) => {setEmailName(e.target.value)}} className='clientInfoInput' name='Email' value={emailName} required></input>         
        </div>
      </div>
      <button type='submit' className='procedeButtonClientInfo'>Next</button>
      </form>
      </>
      : 
      <>
      <div className='clientInfoBoxDetails'>
      <div className='sectionBar'>
        <h2 className='sectionHeading'>Billing Information</h2>
      </div> 
      <h1 className='infoHeader'>Your Details:</h1>
        <div className='clientDetails'>
            <h2 className='clientDetail'>Name: {clientFirstName} {clientLastName}</h2>
            {businessName ? <h2 className='clientDetail'>Empresa: {businessName}</h2> : <></>}
            <h2 className='clientDetail'>Address: {streetName}, {cityName}, {postalCode}</h2>
            <h2 className='clientDetail'>Apartment: {buildingName}</h2>
            <h2 className='clientDetail'>Phone: {phone}</h2>
            <h2 className='clientDetail'>Email: {emailName}</h2>
        </div>
      <h1 className='infoHeader'>Your Order:</h1>
      <div className='detailsHeaders'>
        <h1>Product</h1>
        <h1>Subtotal</h1>
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
      <h1>${newSum.toFixed(2)}</h1>
      <button onClick={() => {setFirstPage(true)}} className='procedeButtonClientInfo'>Back</button>
      <div className='paypal'>
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
      </div>
      </>}
      <svg className='bottomWave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
                <path fill="#092849" fill-opacity="1" d="M0,96L34.3,90.7C68.6,85,137,75,206,85.3C274.3,96,343,128,411,138.7C480,149,549,139,617,117.3C685.7,96,754,64,823,58.7C891.4,53,960,75,1029,96C1097.1,117,1166,139,1234,144C1302.9,149,1371,139,1406,133.3L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"/>
            </svg>
    </div>
    </>
  );
}

export default ClientInfo;