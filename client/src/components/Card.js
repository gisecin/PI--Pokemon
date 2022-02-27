import React from 'react';
import styles from './Card.module.css';
import noimage from '../assets/noImage.png';

export default function Card ({ name, types, image, Types }) {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                { image.length ?
                (<img src={`${image}`} alt={`${name}`} width={`150px`} height={`218px`} />) :
                (<img src={noimage} alt='not found' width='150px' height='150px' style={{marginTop: '30px'}} />)}
            </div>
            <h3>{name}</h3>
            <h5>{ Types?(Types.map((t) => { 
                
                return (<span key={t.id} style={{ marginRight: 5, marginLeft: 5 }}>{t.name}</span>)})):
            (types?.map((t) => {return (<span key={t.id} style={{ marginRight: 5, marginLeft: 5 }}>{t}</span>)}))}</h5>
            
            
        </div>
    )
}