import './App.css';
import {useState, useEffect} from 'react';
import Homescreen from './Homescreen';
import Tortas from './Tortas';
import Tartas from './Tartas';
import Salado from './Salado';
import Budines from './Budines';
import Otros from './Otros';

import Product from './Product';

function App() {
  const [home, setHome] = useState(true);

  const [cakesScreen, setCakesScreen] = useState(false);
  const [tartasScreen, setTartasScreen] = useState(false);
  const [saladoScreen, setSaladoScreen] = useState(false);
  const [budinesScreen, setBudinesScreen] = useState(false);
  const [otrosScreen, setOtrosScreen] = useState(false);

  const [productScreen, setProductScreen] = useState(false);
  const [productImage, setProductImage] = useState();
  const [productName, setProductName] = useState(''); 
  const [productPrice, setProductPrice] = useState(''); 

  return (
    <>
      {home ? <Homescreen setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div> }
      {cakesScreen && home === false ? <Tortas setHome={setHome} setProductScreen={setProductScreen} setProductImage={setProductImage} setProductName={setProductName} setProductPrice={setProductPrice} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {tartasScreen && home === false ? <Tartas setHome={setHome} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {saladoScreen && home === false ? <Salado setHome={setHome} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {budinesScreen && home === false ? <Budines setHome={setHome} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {otrosScreen && home === false ? <Otros setHome={setHome} setProductScreen={setProductScreen} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {productScreen && home === false && cakesScreen === false && tartasScreen === false && saladoScreen === false && budinesScreen === false && otrosScreen === false ? <Product setHome={setHome} setProductScreen={setProductScreen} productImage={productImage} setProductImage={setProductImage} productName={productName}setProductName={setProductName} productPrice={productPrice} setProductPrice={setProductPrice} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
    </>
  );
}

export default App;
