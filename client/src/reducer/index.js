const initialState = {
    characters = []
}


function rootReducer(state= initialState,action){
   switch(action.type){
       case 'GET_CHARACTERS':
       return{
           ...action.state,
           characters: action.payload
       }
   }
}

export default rootReducer;