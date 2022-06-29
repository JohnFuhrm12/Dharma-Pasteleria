import './App.css';
import {useState, useEffect} from 'react';
import Homescreen from './Homescreen';
import Tortas from './Tortas';
import Tartas from './Tartas';
import Salado from './Salado';
import Budines from './Budines';
import Otros from './Otros';

function App() {
  const [home, setHome] = useState(true);
  const [cakesScreen, setCakesScreen] = useState(false);
  const [tartasScreen, setTartasScreen] = useState(false);
  const [saladoScreen, setSaladoScreen] = useState(false);
  const [budinesScreen, setBudinesScreen] = useState(false);
  const [otrosScreen, setOtrosScreen] = useState(false);

  return (
    <>
      {home ? <Homescreen setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div> }
      {cakesScreen && home === false ? <Tortas setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {tartasScreen && home === false ? <Tartas setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {saladoScreen && home === false ? <Salado setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {budinesScreen && home === false ? <Budines setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
      {otrosScreen && home === false ? <Otros setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen} setSaladoScreen={setSaladoScreen} setBudinesScreen={setBudinesScreen} setOtrosScreen={setOtrosScreen}/> : <div></div>}
    </>
  );
}

export default App;
