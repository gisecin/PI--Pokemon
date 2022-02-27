const { Router } = require('express');
const axios = require('axios');
const {Pokemon,Type} = require ('../db.js')
// const {Op} = require ('sequelize');

const router = Router();

// // Configurar los routers
// // Ejemplo: router.use('/auth', authRouter);


//  GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado

router.get('/pokemons', async (req,res) =>{
    const { name } = req.query;

    if (name){
       try {
             let pokemonName = await Pokemon.findOne({
                 where:{name},
                 include:Type
             });

             if(!pokemonName){
                 const pokemonNameApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
                 let pokemonNameFound={
                    id     : pokemonNameApi.data.id,
                    name   : pokemonNameApi.data.name, 
                    image  : pokemonNameApi.data.sprites.other.dream_world.front_default,
                    hp     : pokemonNameApi.data.stats[0].base_stat,
                    attack : pokemonNameApi.data.stats[1].base_stat,
                    defense: pokemonNameApi.data.stats[2].base_stat,
                    speed  : pokemonNameApi.data.stats[5].base_stat,
                    height : pokemonNameApi.data.height,
                    weight : pokemonNameApi.data.weight,
                    types  : pokemonNameApi.data.types.map(t => t.type.name)
                 };
                return res.send(pokemonNameFound);
            };
            return res.send(pokemonName);
            //  let pokeTypesName={
            //     id     : pokemonName.id,
            //     name   : pokemonName.name, 
            //     image  : pokemonName.image,
            //     hp     : pokemonName.hp,
            //     attack : pokemonName.attack,
            //     defense: pokemonName.defense,
            //     speed  : pokemonName.speed,
            //     height : pokemonName.height,
            //     weight : pokemonName.weight,
            //     types  : pokemonName.types.map(t => t.name)
            //  };
            //  if (pokeTypesName) return res.json(pokeTypesName);

       } catch (error) {
         return res.status(404).json({error: `No se encontro ${name}` });
       };
    }
    else{

    // GET /pokemons:
    // Obtener un listado de los pokemons desde pokeapi.
    // Debe devolver solo los datos necesarios para la ruta principal
    try {
        let allPokemons = await Pokemon.findAll({
            include : Type
        });
        let pokemonDb = allPokemons
         pokemonDb = allPokemons?.map(p =>{
            let pokemonTypes = p.types.map(t => t.name);
            return{
                id    : p.id,
                name  : p.name, 
                image : p.image, 
                types : pokemonTypes, 
                attack: p.attack,
                createdDb: p.createdDb
            }
        });

          let pokemonApi = await axios.get('https://pokeapi.co/api/v2/pokemon'); 
          let pokemon40 = await axios.get(pokemonApi.data.next);
              pokemonApi = pokemonApi.data.results.map(el => {
                  return axios.get(el.url);                 
              });
             
              pokemon40 = pokemon40.data.results.map(el => {
                return axios.get(el.url)
             });
             pokemonApi = [...pokemonApi, ...pokemon40];
             pokemonApi = await Promise.all(pokemonApi);
             pokemonApi = pokemonApi?.map(el =>{
                    let pokemonOficial = {
                                id    : el.data.id,
                                name  : el.data.name, 
                                image : el.data.sprites.other.dream_world.front_default, 
                                types : el.data.types.map(t => t.type.name), 
                                attack: el.data.stats[1].base_stat
                                }
                        return pokemonOficial;   
             });
             allPokemons = pokemonDb.concat(pokemonApi);
             res.json(allPokemons);

    } catch (error) {
        console.log(error)
        return res.status(404).json({error: 'Datos no fueron cargados' });
    }
}
});


// GET /pokemons/{idPokemon}:
    // Obtener el detalle de un pokemon en particular
    // Debe traer solo los datos pedidos en la ruta de detalle de pokemon
    // Tener en cuenta que tiene que funcionar tanto para un id de un pokemon existente en pokeapi o uno creado por ustedes 
router.get('/pokemons/:id', async(req,res)=>{
    const { id } = req.params;  
                            //es una validacion de lo que estas recibiendo por parametro
    if (id.includes('-')){ //la - es para diferenciarlo de la api. el includes es para hacer una string. la - seria un UUID
        try {
            const pokemonId = await Pokemon.findByPk(id, {include: Type});

            let pokemonTypesId = {
                id     : pokemonId.id,
                name   : pokemonId.name, 
                image  : pokemonId.image,
                hp     : pokemonId.hp,
                attack : pokemonId.attack,
                defense: pokemonId.defense,
                speed  : pokemonId.speed,
                height : pokemonId.height,
                weight : pokemonId.weight,
                createdDb: pokemonId.createdDb,
                types  : pokemonId.types.map(t => t.name)
            }
            if (pokemonTypesId) return res.json(pokemonTypesId);
        } catch (error) {
            return res.status(404).json({error: `No se encontro ${id}` });
        }
    };
    try {
        let pokemon_Id = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            pokemon_Id ={
                id     : pokemon_Id.data.id,
                name   : pokemon_Id.data.name, 
                image  : pokemon_Id.data.sprites.other.dream_world.front_default,
                hp     : pokemon_Id.data.stats[0].base_stat,
                attack : pokemon_Id.data.stats[1].base_stat,
                defense: pokemon_Id.data.stats[2].base_stat,
                speed  : pokemon_Id.data.stats[5].base_stat,
                height : pokemon_Id.data.height,
                weight : pokemon_Id.data.weight,
                types  : pokemon_Id.data.types.map(t => t.type.name)
            };
            res.json(pokemon_Id)
    } catch (error) {
        return res.status(404).json({error: `No se encontro ${id}` });
    }

});


//  POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos
router.post('/pokemons', async(req,res) =>{
    try {
        const { name,image,hp,attack,defense,speed,height,weight,createdDb,type } = req.body;
        const pokemon = await Pokemon.create({
            name : name.toLowerCase(),
            image,
            hp,
            attack,
            defense,
            speed,
            height,
            weight,
            createdDb
        })

        let promises = type.map(type => Type.findOne({where:{name:type}}))                    
        let createtypes = await Promise.all(promises) //terminar de buscar todo hasta que te aparezca en la bd 
        await pokemon.addTypes(createtypes) //el add te suma por ej 1,2,3 y el 4 si lo agregas
        
        res.status(201).json(pokemon)
    } catch (error) {
        res.status(404).send('Pokemon no fue creado: ' + error);
    }
})

//  GET /types:
// Obtener todos los tipos de pokemons posibles
// En una primera instancia deberán traerlos desde pokeapi y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
router.get('/types', async (req,res) =>{

    const typeDb = await Type.findAll(); //para ver cuantos tipos ya tenemos guardados. traer un arreglo de obj

    try {
        if(typeDb.length === 0){ //si esta el arreglo el vacio, llamas a la api
            let typeApi = await axios.get(`https://pokeapi.co/api/v2/type`);
            typeApi = typeApi.data.results.map(t => t.name); //te devuelve un nuevo arreglo solo con name
            typeApi.forEach(name =>{ //creas en la bd lo que hiciste en el map
                Type.create({
                    name: name
                });
            });
        }
        res.json(typeDb);
    } catch (error) {
        return res.status(404).json({error: 'Tipos no fueron cargados' + error});
    }
})
//la primera vez que lo ejecutas te trae el arreglo vacio (por el findAll), aunque ya se hayan creado. y la segunda ya te aparece
//para que traiga todo hay que hacer un promise.All

module.exports = router;