import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import _ from "lodash";
import { GetPokemonList } from './../actions/pokemonAction';
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';

const PokemonList = (props) => {

    const [search, setSearch] = useState("")

    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList);
    console.log(pokemonList);
    useEffect(() => {
        fecthData(1)
    }, [])

    const fecthData = (page = 1) => {
        dispatch(GetPokemonList(page))
    }

    const showData = () => {

        if (pokemonList.loading) {
            return <p>Loainding...</p>
        }
        if (!_.isEmpty(pokemonList.data)) {
            return (
                <div className="container">
                    { pokemonList.data.map(item => {
                        return (
                            <div className="pokemons-list">
                                <p>{item.name}</p>
                                <Link to={`/pokemon/${item.name}`}> View</Link>
                            </div>
                        )
                    })}
                </div>
            )
        }



        if (pokemonList.errorMessage !== "") {
            return <p>{pokemonList.errorMessage}</p>
        }
        return <p>Unable to get data</p>
    };
    return (
        <div className="main-container">
            <div className="container-search">

                <input type="text" onChange={e => setSearch(e.target.value)} placeholder={"Pokemon Name"} />
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            {showData()}
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                    pageCount={Math.ceil(pokemonList.count / 15)}
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={1}
                    onPageChange={(data) => fecthData(data.selected + 1)}
                    containerClassName={"paginate-container"}
                />
            )}
        </div>
    )
}

export default PokemonList;