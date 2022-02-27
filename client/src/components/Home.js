import React from 'react';
import { Link } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, getTypes, orderByNameStrength, filterByTypes, filterCreated } from '../actions';
import Header from './Header';
import Card from './Card';
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import Loading from './Loading';
import NotFound from './NotFound';
import styles from './Home.module.css';
import noimage from '../assets/noImage.png';

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.alltypes);
    // console.log(allPokemons)
    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    },[dispatch])

    const [currentPage, setCurrentPage] = useState(1); // ESTADO LOCAL ARRANCA EN PAGINA 1
    // eslint-disable-next-line no-unused-vars
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12); // ESTADO LOCAL CANTIDAD DE CARACTERES POR PAGINA
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    const currentPokemons = allPokemons?.slice(indexOfFirstPokemon, indexOfLastPokemon);
    // eslint-disable-next-line no-unused-vars
    const [order, setOrder] = useState('');

    // const [orderByNameStrength, setOrderByNameStrength] = useState('All');
    // const [filterByTypes, setFilterByTypes] = useState('All');
    // const [filterCreated, setFilterCreated] = useState('All');

    const page = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleClickLoadAll(e){
        e.preventDefault(); // CADA VEZ QUE RECARGAMOS LOS ESTADOS DE REDUX VULVEN A CARGARSE SI TENEMOS USEEFFECT
        dispatch(getPokemons());
        setCurrentPage(1);
    }

    // function handleLife(e){
    //     dispatch(filteredByLife());
    //     setCurrentPage(1);
    // }

    function handleOrderByNameStrength(e){
        dispatch(orderByNameStrength(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered by ${e.target.value}`);
    }

    function handleFilterByTypes(e) {
        dispatch(filterByTypes(e.target.value));
        setCurrentPage(1);
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
    }

    return (
        <div className={styles.main}>
            <Header />
            <div>
                <Link to='/pokemons'>
                    <button className={styles.create}>CREATE YOUR OWN POKEMON!</button>
                </Link>
            </div>
            <div className={styles.filters}>
                <button className={styles.load} onClick={(e) => {handleClickLoadAll(e)}}>
                    Load All Pokemons
                </button>
                {/* <button className={styles.load} onClick={(e) => {handleLife(e)}}>
                    Life 20
                </button> */}
                <select className={styles.orderby} onChange={(e) => handleOrderByNameStrength(e)}>
                    <option value='All'>Order By / Show All</option>
                    <option value='asc'>Name Asc / A-Z</option>
                    <option value='desc'>Name Desc / Z-A</option>
                    <option value='strong'>Stronger to Weaker</option>
                    <option value='weak'>Weaker to Stronger</option>
                </select>
                <select className={styles.type} onChange={(e) => {handleFilterByTypes(e)}}>
                    <option value="All">Types / Show All</option>
                    {types
                    .sort((a, b) => {
                        if (a.name < b.name) return -1;
                        if (a.name > b.name) return 1;
                        return 0;
                    })
                    .map((t) => (
                        <option value={t.name} key={t.name}>
                        {t.name}
                        </option>
                    ))}
                </select>
                <select className={styles.origin} onChange={(e) => handleFilterCreated(e)}>
                    <option value='All'>Origin / Show All</option>
                    <option value='api'>Existent</option>
                    <option value='created'>Created</option>
                </select>
            </div>
            <div className={styles.searchbar}>
                <SearchBar/>
            </div>
            <div>
                <Paginate
                pokemonsPerPage = { pokemonsPerPage }
                allPokemons = { allPokemons.length }
                page = { page }
                currentPage = { currentPage }
                setCurrentPage = { setCurrentPage }
                />
            </div>
            <div className={styles.grid}>
                {
                    !currentPokemons.length?
                    <Loading /> :
                    currentPokemons[0] === 404?
                    <NotFound /> :
                    currentPokemons?.map(p => {
                        return(
                            <div key={p.id}>
                                <Link key={p.id} to={"/home/" + p.id}>
                                <Card key={p.id}name={p.name}
                                types={p.types}
                                Types={p.Types}
                                image={p.image ? p.image : <img src={noimage} alt='not found' />} key={p.id}/>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
            <div>
                <Paginate
                pokemonsPerPage = { pokemonsPerPage }
                allPokemons = { allPokemons.length }
                page = { page }
                currentPage = { currentPage }
                setCurrentPage = { setCurrentPage }
                />
            </div>
        </div>
    )
}