import React from 'react';
import './App.css';
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import PokemonList from './containers/PokemonList';
import Pokemon from './containers/Pokemon';


const App = () => {
  return (
    <div className="App">
      <nav >
        <h2 className="title" >Pokemons</h2>
        <NavLink to={"/"} >Search</NavLink>
      </nav>
      <Switch>
        <Route path={"/"} exact component={PokemonList} />
        <Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;
