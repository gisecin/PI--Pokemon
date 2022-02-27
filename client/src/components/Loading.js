import React from "react";
import styles from './Loading.module.css';

export default function Loading(){
    return(
        <div>
            <div className={styles.loading}></div>
            <h2>Loading Pokemon/s...</h2>
        </div>
    )
}