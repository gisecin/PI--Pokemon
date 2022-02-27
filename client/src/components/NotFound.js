import React from "react";
import styles from './NotFound.module.css';

export default function Loading(){
    return(
        <div>
            <div className={styles.notfound}></div>
            <h2>Sorry, nothing to show :(</h2>
        </div>
    )
}