import './App.css';
import {useState, useEffect} from 'react';
import Homescreen from './Homescreen';
import Tortas from './Tortas';
import Tartas from './Tartas';

function App() {
  const [home, setHome] = useState(true);
  const [cakesScreen, setCakesScreen] = useState(false);
  const [tartasScreen, setTartasScreen] = useState(false);

  return (
    <>
      {home ? <Homescreen setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen}/> : <div></div> }
      {cakesScreen && home === false ? <Tortas setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen}/> : <div></div>}
      {tartasScreen && home === false ? <Tartas setHome={setHome} setCakesScreen={setCakesScreen} setTartasScreen={setTartasScreen}/> : <div></div>}
    </>
  );
}

export default App;
