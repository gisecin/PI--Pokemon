import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
// import bg from '../assets/bg.jpg';

export default function LandingPage () {
    return (
        <div className={styles.landing}>
            <div className={styles.content}>
            <h1>Welcome to the Pokemon jungle!</h1>
            <Link to='/home' >
                <button className={styles.enter}>ENTER</button>
            </Link>
            </div>
        </div>
    )
}