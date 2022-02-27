import axios from 'axios';

export function getPokemons(){
    return async function(dispatch){
        var json= await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: 'GET_POKEMONS',
            payload: json.data
        })
    }
}

export function getNamePokemons(name){
    return async function (dispatch){
        try {
            // var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`);
            var json = await axios.get('http://localhost:3001/pokemons?name=' + name);
            return dispatch ({
                type: 'GET_NAME_POKEMONS',
                payload: json.data,
                
            })
        } catch (error) {
            console.log(error)
            return dispatch ({
                type: 'GET_NAME_POKEMONS',
                payload: []
            })
            // console.log(error)
        }
    }
}

// export function filterByLife(payload){
//     // console.log(payload)
//     return{
//         type: 'FILTER_BY_LIFE',
//         payload
//     }
// }

export function filterCreated(payload){
    // console.log(payload)
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByNameStrength(payload){
    //console.log(payload)
    return{
        type: 'ORDER_BY_NAME_STRENGTH',
        payload
    }
}

// export function resetFilters(payload) {
//     return {
//       type: RESET_FILTERS,
//       payload,
//     };
// }

export function getTypes(){
    return async function (dispatch) {
        var json = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
        })
    }
}

export function filterByTypes(payload){
    //console.log(payload)
    return {
        type: 'FILTER_BY_TYPES',
        payload
    }
}

export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get('http://localhost:3001/pokemons/' + id);
            return dispatch ({
                type: 'GET_DETAIL',
                payload: json.data
            }) 
        }catch(error){
            return dispatch ({
                type: 'GET_DETAIL',
                payload: null
            })
            // console.log(error)
        }
    }
}

export function clearDetail() {
    return {
      type: 'CLEAR_DETAIL',
    }
}

export function postPokemon(payload){
    return async function (dispatch) {
        var response = await axios.post('http://localhost:3001/pokemons', payload);
        // console.log(response);
        return response;
    }
}