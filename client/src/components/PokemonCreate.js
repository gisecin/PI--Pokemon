import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState , useEffect } from 'react';
import { getPokemons, postPokemon, getTypes } from '../actions';
import { useDispatch, useSelector } from "react-redux";
import Header from './Header';
import styles from "./PokemonCreate.module.css";

function validate(input) {
    let errors = {};
    if (input.name.length < 4) {
        errors.name = '<- Min 4 characters'
    }
    if (input.name.length > 15) {
        errors.name = '<- Max 15 characters'
    }
    if (!input.name) {
        errors.name = '<- Name is required'
    }
    // if(!/^[A-Za-z-]*(?<!\.)$/.test(input.name)) {
    //     errors.name = '<- Only letters and (-)'
    // }

    const validName = /^[A-Za-z-]*$/;

    if(input.name.length > 0 && !validName.test(input.name)) {
        errors.name = '<- Only letters and (-)'
    }

    if (input.hp < 0) {
        errors.hp = '<- Positive numbers only'
    }
    if (input.hp > 200) {
        errors.hp = '<- 200 max value'
    }
    if (input.hp % 1 !== 0 || input.hp.includes('.')) {
        errors.hp = '<- Integer numbers only'
    }

    if (input.attack < 0) {
        errors.attack = '<- Positive numbers only'
    }
    if (input.attack > 200) {
        errors.attack = '<- 200 max value'
    }
    if (input.attack % 1 !== 0 || input.attack.includes('.')) {
        errors.attack = '<- Integer numbers only'
    }

    if (input.defense < 0) {
        errors.defense = '<- Positive numbers only'
    }
    if (input.defense > 200) {
        errors.defense = '<- 200 max value'
    }
    if (input.defense % 1 !== 0 || input.defense.includes('.')) {
        errors.defense = '<- Integer numbers only'
    }

    if (input.speed < 0) {
        errors.speed = '<- Positive numbers only'
    }
    if (input.speed > 200) {
        errors.speed = '<- 200 max value'
    }
    if (input.speed % 1 !== 0 || input.speed.includes('.')) {
        errors.speed = '<- Integer numbers only'
    }

    if (input.height < 0) {
        errors.height = '<- Positive numbers only'
    }
    if (input.height > 200) {
        errors.height = '<- 200 max value'
    }
    if (input.height % 1 !== 0 || input.height.includes('.')) {
        errors.height = '<- Integer numbers only'
    }

    if (input.weight < 0) {
        errors.weight = '<- Positive numbers only'
    }
    if (input.weight > 1000) {
        errors.weight = '<- 1000 max value'
    }
    if (input.weight % 1 !== 0 || input.weight.includes('.')) {
        errors.weight = '<- Integer numbers only'
    }

    const validURL = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|svg)/gi;

    if(input.image.length > 0 && !validURL.test(input.image)) {
        errors.image = '<- Enter a valid URL'
    }

    // if (!input.type.length) {
    //     errors.type = '<- Type is required'
    // }
    // if (input.type.length > 2) {
    //     errors.type = '<- Type is required'
    // }
    return errors;
}

export default function PokemonCreate(){
    const dispatch = useDispatch();
    const history = useNavigate();

    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    },[dispatch])

    // useEffect(() => {
    //     dispatch(getTypes());
    // },[]);

    const types = useSelector((state) => state.alltypes);
    const allPokemons = useSelector((state) => state.allpokemons);
    
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height: '',
        weight: '',
        image: '',
        type: []
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value 
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleSelect(e){
        if(input.type.includes(e.target.value)){
            setInput({
                ...input,
                type: input.type.filter(t => t === e.target.value)
            })
        } else {
            setInput({
                ...input,
                type: [...input.type, e.target.value]
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        // const errors = validate(input);
        // if (allPokemons.find((p) =>p.name.toLowerCase() === input.name.toLowerCase().trim())) {
        if (allPokemons.find(p =>p.name.toLowerCase().replace(/\s/g, '') === input.name.toLowerCase().replace(/\s/g, ''))) {
            alert('Name already exists! Please choose a different name.');
            // setInput({
            //     name: '',
            //   });
            setErrors(validate({
              ...input,
              [e.target.name]: 'Name already exists!',
            }));
            // history('/home');
        } else if (!Object.keys(errors).length) {
          dispatch(postPokemon(input));
          alert('Pokemon created succssesfully!!');
          setInput({
            name: '',
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            height: '',
            weight: '',
            image: '',
            type: [],
          });
          history('/home');
        } else {
          alert('Please review the form!');
        }
      }

    function handleDelete(e){
        setInput({
            ...input,
            type: input.type.filter(t => t !== e)
        })
    }

    return(
        <div>
            <Header />
            <div className={styles.main}>
                <div className={styles.card}>
                <h1>Create your own customized Pokemon!</h1>
                <h5>* Required fields</h5>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.input}>
                        <div className={styles.label}>Name: *</div>
                        <input
                        type= "text"
                        value={input.name}
                        name= "name"
                        placeholder="Name (only letters, no spaces)"
                        onChange={(e) => handleChange(e)}
                        />
                        <div className={styles.errors}>{errors.name && (
                            <span>{errors.name}</span>
                        )}</div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.label}>Life:</div>
                        <input
                        type="text"
                        value={input.hp}
                        name="hp"
                        placeholder="Please enter a number (0-200)"
                        onChange={(e) => handleChange(e)}
                        />
                        <div className={styles.errors}>{errors.hp && (
                            <span>{errors.hp}</span>
                        )}</div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.label}>Attack:</div>
                        <input
                        type="text"
                        value={input.attack}
                        name="attack"
                        placeholder="Please enter a number (0-200)"
                        onChange={(e) => handleChange(e)}
                        />
                        <div className={styles.errors}>{errors.attack && (
                            <span>{errors.attack}</span>
                        )}</div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.label}>Defense:</div>
                        <input
                        type="text"
                        value={input.defense}
                        name="defense"
                        placeholder="Please enter a number (0-200)"
                        onChange={(e) => handleChange(e)}
                        />
                        <div className={styles.errors}>{errors.defense && (
                            <span>{errors.defense}</span>
                        )}</div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.label}>Speed:</div>
                        <input
                        type="text"
                        value={input.speed}
                        name="speed"
                        placeholder="Please enter a number (0-200)"
                        onChange={(e) => handleChange(e)}
                        />
                        <div className={styles.errors}>{errors.speed && (
                            <span>{errors.speed}</span>
                        )}</div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.label}>Height:</div>
                        <input
                        type="text"
                        value={input.height}
                        name="height"
                        placeholder="Please enter a number (0-200)"
                        onChange={(e) => handleChange(e)}
                        />
                        <div className={styles.errors}>{errors.height && (
                            <span>{errors.height}</span>
                        )}</div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.label}>Weight:</div>
                        <input
                        type="text"
                        value={input.weight}
                        name="weight"
                        placeholder="Please enter a number (0-1000)"
                        onChange={(e) => handleChange(e)}
                        />
                        <div className={styles.errors}>{errors.weight && (
                            <span>{errors.weight}</span>
                        )}</div>
                    </div>
                    <div className={styles.input}>
                        <div className={styles.label}>Image:</div>
                        <input
                        type="text"
                        value={input.image}
                        name="image"
                        placeholder="Please enter the image url"
                        onChange={(e) => handleChange(e)}
                        />
                        <div className={styles.errors}>{errors.image && (
                            <span>{errors.image}</span>
                        )}</div>
                    </div>
                    <div className={styles.input}>
                    <select name="Types" className={styles.types} onChange={(e) => handleSelect(e)} disabled={input.type.length >= 2}>
                        <option value="" selected disabled>Select Types</option>
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
                    <div className={styles.type}>
                        {input.type.map(t =>
                        <div>
                        <span>{t}</span>
                        <button type="button" onClick={() => handleDelete(t)}>x</button>
                        </div>
                    )}</div>
                    <div className={styles.errors}>{errors.type && (
                        <span>{errors.type}</span>
                    )}</div>
                    </div>
                    <button className={styles.create} type='submit' disabled={!input.name}>CREATE POKEMON</button>
                </form>
                </div>
            </div>
            <Link to='/home'>
                <button className={styles.back}>GO BACK HOME!</button>
            </Link>
        </div>
    )
}