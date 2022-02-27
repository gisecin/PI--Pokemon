const initialState = {
    pokemons: [],
    allpokemons: [],
    alltypes: [],
    detail: [],
    sortedpokemons: []
}

function rootReducer (state = initialState, action) {
    switch(action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allpokemons: action.payload
            };

        // case 'FILTER_BY_LIFE':
        //     const allPokemons = state.pokemons;
        //     const filterByLife = allPokemons.filter(p => p.hp < 20);
        //     return {
        //         ...state,
        //         pokemons: filterByLife
        //     }


        case 'GET_NAME_POKEMONS':
        
                return {
                    ...state,
                    pokemons: action.payload
                
            
            };

        // case 'GET_NO_POKEMONS':
        //     return {
        //         ...state,
        //         pokemons: 'Pokemon not found'
        //     };

        case 'GET_TYPES':
            return {
                ...state,
                alltypes: action.payload
            };

        case 'FILTER_BY_TYPES':
            const allPokemons0 = state.allpokemons;
            const filteredByType = action.payload === 'All' ? allPokemons0 :
                allPokemons0.filter((p) => p.types?.includes(action.payload))//si existe types que me lo traiga
            if(!filteredByType.length){
                return {
                    ...state,
                    pokemons: [404]
                }
            } else {
                return {
                    ...state,
                    pokemons: filteredByType
                }
            };

        case 'FILTER_CREATED':
            const allPokemons1 = state.allpokemons;
            const createdFilter = action.payload === 'All' ? allPokemons1 : 
                action.payload === 'created' ? allPokemons1.filter(p => p.createdInDb) :
                allPokemons1.filter(p => !p.createdInDb);
            if(!createdFilter.length){
                return {
                    ...state,
                    pokemons: [404]
                }
            } else {
                return {
                    ...state,
                    pokemons: createdFilter
                }
            };

        case 'ORDER_BY_NAME_STRENGTH':
            const allPokemons2 = state.pokemons;
            const sortedpokemons = action.payload === 'asc' ?
            allPokemons2.sort((a,b) => {
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0
            }) : action.payload === 'desc' ?
            allPokemons2.sort((a,b) => {
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0
            }) : action.payload === 'strong' ?
            allPokemons2.sort((a,b) => {
                // if (a.attack > b.attack){
                //     return -1;
                // }
                // if (b.attack > a.attack){
                //     return 1;
                // }
                // return 0;
                return b.attack - a.attack;
            }) : action.payload === 'weak' ?
            allPokemons2.sort((a,b) => {
                // if (a.attack < b.attack){
                //     return -1;
                // }
                // if (b.attack < a.attack){
                //     return 1;
                // }
                // return 0;
                return a.attack - b.attack;
            }) : allPokemons2.sort((a,b) => {
                return a.id - b.id;
            })
            return {
                ...state,
                pokemmons: sortedpokemons
            };

        case 'GET_DETAIL':
            if(!action.payload){
                return {
                    ...state,
                    detail: [404]
                }
            } else {
                return {
                    ...state,
                    detail: action.payload
                }
            };

       

        // case RESET_FILTERS:
        //     return {
        //         ...state,
        //         detail: {},
        //     };

        case 'POST_POKEMON':
            return {
                ...state
            };

        default:
            return state;
    }

}

export default rootReducer;