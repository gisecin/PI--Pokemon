const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
const { Pokemon, Type } = require('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const getApiInfo = async () =>{
    const apiUrl = await axios.get('https://pokeapi.co/api/v2/pokemon')
    const first20 = apiUrl.data.results
    const apiUrl2 = await axios.get(apiUrl.data.next)
    const last20 = apiUrl2.data.results
    const allLinks = first20.map(e => e.url).concat(last20.map(e => e.url))
    const promises = allLinks.map(e => axios.get(e))
    const allinfo = Promise.all(promises)
}

router.get('./pokemons', async (req,res) => {
    const allinfo = getApiInfo()
    return res.json(allinfo)
})


module.exports = router;
