import React from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Detail.module.css';
import Header from './Header';
import Loading2 from './Loading2';
import NotFound from './NotFound';
import noimage from '../assets/noImage.png';


export default function Detail (props){
    console.log(props);
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id));
        // return () => dispatch(clearDetail()); // LIMPIO EL ESTADO DEL DETAIL
    },[dispatch, id])

    

    const myPokemon = useSelector((state) => state.detail);
    console.log(myPokemon)

    return (
      <div>
      {
        id > 40 ? (<div>Error</div>)
         : (   <div>
          <Header />
          {Object.keys(myPokemon).length > 0  ? myPokemon.name : null}
          
          <div className={styles.main}>
         {Object.keys(myPokemon).length > 0  ?
            <div className={styles.card}>
                <div>
                  <div>
                    <div>
                      <h1>{myPokemon.name}</h1>
                      {/* <h3 style={{ margin: 0 }}> id: {myPokemon[0].id}</h3> */}
                      <div className={styles.image}>
                        {/* <img src={myPokemon[0].image} alt={myPokemon[0].name} width="300px" /> */}
                        { myPokemon.image.length ?
                        (<img src={myPokemon.image} alt={myPokemon.name} width="300px" />) :
                        (<img src={noimage} alt='not found' width='280px' height='280px' style={{marginTop: '0px'}} />)}
                      </div>
                      <h3>
                        {myPokemon.types.map((t) => {
                          return (
                            <span style={{ marginRight: 5, marginLeft: 5 }}>{t}</span>
                          )
                        })}
                      </h3>
                    </div>
                    <div className={styles.stats}>
                      <div className={styles.stat}>
                        <span>Life: {myPokemon.hp}</span>
                        <progress max="200" value={myPokemon.hp}>{myPokemon.hp}</progress>
                      </div>
                      <div className={styles.stat}>
                        <span>Attack: {myPokemon.attack}</span>
                        <progress max="200" value={myPokemon.attack}>{myPokemon.strength}</progress>
                      </div>
                      <div className={styles.stat}>
                        <span>Defense: {myPokemon.defense}</span>
                        <progress max="200" value={myPokemon.defense}>{myPokemon.defense}</progress>
                      </div>
                      <div className={styles.stat}>
                        <span>Speed: {myPokemon.speed}</span>
                        <progress max="200" value={myPokemon.speed}>{myPokemon.speed}</progress>
                      </div>
                      <div className={styles.stat}>
                        <span>Height: {myPokemon.height}</span>
                        <progress max="200" value={myPokemon.height}>{myPokemon.height}</progress>
                      </div>
                      <div className={styles.stat}>
                        <span>Weight: {myPokemon.weight}</span>
                        <progress max="1000" value={myPokemon.weight}>{myPokemon.weight}</progress>
                      </div>
                    </div>
                  </div>
                </div> 
              </div> :
              myPokemon === 404?
              <NotFound /> :
              <Loading2 />
              }
          </div>
          <Link to="/home">
            <button className={styles.back}>GO BACK HOME!</button>
          </Link>
        </div>)
       }
       </div>

   
    );
  }