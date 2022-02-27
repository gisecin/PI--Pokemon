import React from "react";
import styles from './Loading.module.css';

export default function Loading2(){
    return(
        <div>
            <div className={styles.loading}></div>
            <h2>Loading Pokemon...</h2>
        </div>
    )
}