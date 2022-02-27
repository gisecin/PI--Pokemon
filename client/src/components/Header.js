import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import logopokemon from "../assets/logoPokemon.png";

export default function Header(){
    return(
        <div className={styles.header}>
            <Link to={"/"}>
                <img src={logopokemon} alt="Pokemon" width="200px" />
            </Link>
        </div>
    )
}