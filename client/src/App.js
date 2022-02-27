import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import PokemonCreate from './components/PokemonCreate';
import Detail from './components/Detail';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
        <Routes>
        <Route exact path= "/" element = {<LandingPage/>}></Route>
        <Route path= "/home" element = {<Home/>}></Route>
        <Route path= "/home/:id" element = {<Detail/>}></Route>
        <Route path= "/pokemons" element = {<PokemonCreate/>}></Route>
        </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;