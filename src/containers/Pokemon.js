import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { GetPokemon } from "../actions/pokemonAction";

import _ from "lodash"

const Pokemon = (props) => {
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch()
    const pokemonState = useSelector(state => state.Pokemon)

    useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, [])

    const showData = () => {
        if (!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName];
            return (
                <div className="container-pokemon">
                    <div className="pokemon" >
                        <img src={pokeData.sprites.front_default} alt="" />
                    </div>
                    <div className="item" >
                        <h2>Stats</h2>
                        {pokeData.stats.map(item => {
                            return (
                                <div>
                                    <p>{item.stat.name} {item.base_stat}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="item">
                        <h2>Ability</h2>
                        {pokeData.abilities.map(item => {
                            return (
                                <div>
                                    <p>{item.ability.name} </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        }

        if (pokemonState.loading) {
            return <p>Loading...</p>
        }

        if (pokemonState.errorMessage !== "") {
            return <p>{pokemonState.errorMessage}</p>
        }

        return <p>Error gettig pokemon</p>
    }

    return (
        <div className="center">

            <div className="poke">
                <h2>{pokemonName}</h2>
                {showData()}
            </div>
        </div>
    )
}

export default Pokemon;