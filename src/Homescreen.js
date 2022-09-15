import './App.css';
import {useState, useEffect} from 'react';

import cart from './static/cart.png';
import search from './static/search.png';

import coralHome from './static/coralHome.jpg';
import hardCoralsHome from './static/hardCoralsHome.jpg';
import fishHome from './static/fishHome.jpg';
import invertHome from './static/invertHome.jpg';
import suppliesHome from './static/suppliesHome.jpg';

import test from './static/test.gif';
import testvid from './static/testvid.mp4';

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

function Homescreen( {...props} ) {

    const [searchKey, setSearchKey] = useState('');

    function refresh() {
        window.location.reload(false);
      };

    function searchFunc(e) {
        if(e.key === 'Enter') {
            props.setSearchQuery(searchKey);
            props.setSearchScreen(true);
            props.setHome(false);
        };
    };

    function showProductSelection(e) {
        props.setHome(false);
        props.setProductSelectionCategory(e.currentTarget.title);
        props.setProductSelectionScreen(true);
    };

    function showAdmin() {
        props.setHome(false);
        props.setAdminScreen(true);
    };

    function showCart() {
        props.setCartScreen(true);
        props.setHome(false);
      };

    return (
        <>
        <div className='page'>
            <div className='titleBar'>
                    <h1 className='titleName' onClick={refresh} >JF Aquatics</h1>
                    <h1 className='catName' title="Soft Corals" onClick={showProductSelection}>Corals</h1>
                    <h1 className='catName' title="Supplies" onClick={showProductSelection}>Supplies</h1>
                    <h1 className='catName' title="Saltwater Fish" onClick={showProductSelection}>Fish</h1>
                    <h1 className='catName' title="Invertebrates" onClick={showProductSelection}>Inverts</h1>
                <div className='searchCart'>
                    <img src={search} className="search" alt="Search"/>
                    <input onChange={(e) => {setSearchKey(e.target.value)}} onKeyDown={(e) => {searchFunc(e)}} className='searchBar' type="text" value={searchKey} placeholder="Search ..."/>
                    <img onClick={showCart} src={cart} className="cart" alt="Carrito"/>
                    <p className='cartQuantity'>{props.cartAmount}</p>
                </div>
            </div>
            <div className='videoBox'>
                <h1 className='videoText'>The Best Supply of</h1>
                <h1 className='videoText2'>Saltwater Fish and Corals</h1>
                <video className='homeVideo' src={testvid} muted autoPlay loop/>
            </div>
            <div className='waveSVG'>
                <g fill="none" fill-rule="evenodd">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 280"><path fill="#092849" fill-opacity="1" d="M0,64L60,101.3C120,139,240,213,360,218.7C480,224,600,160,720,138.7C840,117,960,139,1080,165.3C1200,192,1320,224,1380,240L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path></svg>
                    <svg className='testSVG' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#092849" fill-opacity="1" d="M0,32L80,37.3C160,43,320,53,480,80C640,107,800,149,960,154.7C1120,160,1280,128,1360,112L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
                    <svg className='testSVG2' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill="#FF" fill-opacity="1" d="M0,32L80,69.3C160,107,320,181,480,202.7C640,224,800,192,960,160C1120,128,1280,96,1360,80L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
                    <svg className='testSVG3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FFF" fill-opacity="1" d="M0,32L120,69.3C240,107,480,181,720,186.7C960,192,1200,128,1320,96L1440,64L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
                    <svg className='testSVG4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1990 240"><path fill="#FF" fill-opacity="1" d="M0,32L120,69.3C240,107,480,181,720,186.7C960,192,1200,128,1320,96L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path></svg>
                    <svg className='testSVG5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1540 400"><path fill="#0099FF" fill-opacity="1" d="M0,288L120,261.3C240,235,480,181,720,170.7C960,160,1200,192,1320,208L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg>
                </g>
            </div>
            <h1 className='selectionTitle'>Our Selection</h1>
            <div className='selectionChoicesTop'>
            <div>
                <img onClick={showProductSelection} src={coralHome} className="selectionIMG" title="Soft Corals" alt="Selection-Soft=Corals"/>
                <h1  onClick={showProductSelection} title="Soft Corals" className='selectionName'>Shop Soft Corals</h1>
            </div>
            <div>
                <img onClick={showProductSelection} src={hardCoralsHome} className="selectionIMG" title="Hard Corals" alt="Selection-Hard-Corals"/>
                <h1 onClick={showProductSelection} title="Hard Corals"className='selectionName'>Shop Hard Corals</h1>
            </div>
            <div>
                <img onClick={showProductSelection} src={fishHome} className="selectionIMG" title="Saltwater Fish" alt="Selection-Fish"/>
                <h1 onClick={showProductSelection} title="Saltwater Fish" className='selectionName'>Shop Fish</h1>
            </div>
            </div>
            <div className='selectionChoicesBottom'>
            <div>
                <img onClick={showProductSelection} src={invertHome} className="selectionIMG" title="Invertebrates" alt="Selection-Inverts"/>
                <h1 onClick={showProductSelection} title="Invertebrates" className='selectionName'>Shop Inverts</h1>
            </div>
            <div>
                <img onClick={showProductSelection} src={suppliesHome} className="selectionIMG" title="Supplies" alt="Selection-Supplies"/>
                <h1 onClick={showProductSelection} title="Supplies" className='selectionName'>Shop Supplies</h1>
            </div>
            </div>
            <svg className='bottomWave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#092849" fill-opacity="1" d="M0,96L34.3,90.7C68.6,85,137,75,206,85.3C274.3,96,343,128,411,138.7C480,149,549,139,617,117.3C685.7,96,754,64,823,58.7C891.4,53,960,75,1029,96C1097.1,117,1166,139,1234,144C1302.9,149,1371,139,1406,133.3L1440,128L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"/>
            </svg>
        </div>
        </>
    )
}

export default Homescreen;