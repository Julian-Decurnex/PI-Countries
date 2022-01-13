const { Router } = require('express');
const axios = require('axios');
const { Country, Activity} = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

async function getCountries () {
    const apiUrl = await axios.get('https://restcountries.com/v3.1/all')
    const apiInfo = await apiUrl.data.map(country => {
        return {
            id: country.cioc || country.cca3,
            name: country.name.common,
            img: country.flags.png,
            continent: country.region,
            capital: country.hasOwnProperty('capital') ? country.capital[0] : 'None',
            subregion: country.hasOwnProperty('subregion') ? country.subregion : 'Unknown',
            area: country.hasOwnProperty('area') ? country.area : 'Unknown',
            population: country.hasOwnProperty('population') ? country.population : 'Unknown',
        }
    })
    const orderedApiInfo = apiInfo.sort(function(a, b) {
        if(a.name > b.name){
            return 1
        }
        if(b.name > a.name) {
            return -1
        }
        return 0
    })

    return(orderedApiInfo)
}

// router.get('/countries/:continent', async (req, res) => {
//     const {continent} = req.params
//     let countries = await Country.findAll({
//         where: {continent: continent}
//     })
//     res.send(countries)
// })

//Si no recibe query, devuelve todos los paises

router.get('/', (req, res) => {
    res.sendStatus(200)
})

router.get('/countries', async (req, res, next) => {
    try {
        if(!req.query.name){
            let countries = await getCountries()
            countries.forEach(country => {
                Country.findOrCreate({
                    where: {
                        id: country.id,
                        name: country.name,
                        img: country.img,
                        continent: country.continent,
                        capital: country.capital,
                        subregion: country.subregion,
                        area: country.area,
                        population: country.population
                    }
                })
            })
            const allCountries = await Country.findAll({
                include: Activity
            })
            res.send(allCountries)
        } else{
            next()
        }
    } catch(error) {
        res.send(error)
    }
})

//Si recibe query, devuelve el pais cuyo nombre incluya el string ingresado

router.get('/countries', async (req, res) => {
    try {
        const {name} = req.query
        const allCountries = await Country.findAll({
            include: Activity
        })
        const country = allCountries.filter(country => country.name.toLowerCase().includes(name.toLowerCase()))
        country.length ? res.send(country) : res.send('No se encontro ningun pais que coincida con los parametros de busqueda')
    } catch(error) {
        res.send(error)
    }
})

//Si recibe id del pais por params

router.get('/countries/:countryId', async (req, res) => {
    try {
        const {countryId} = req.params
        const country = await Country.findAll({
            where: {id: countryId.toUpperCase()},
            include: Activity
        })
        res.send(country)
    } catch(error) {
        res.send(error)
    }
})

//Agregamos una actividad cuya data nos llega desde el formularios de Nueva Actividad

router.post('/activity', async (req, res) => {
    try {
        const {name, difficulty, duration, season, country} = req.body

        const newActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        })

        let activityCountry = await Country.findAll({
            where: {name: country}
        })

        activityCountry.forEach(country => {
            newActivity.addCountry(country)
        })

        res.send('Actividad creada con exito!')
    } catch(error) {
        res.send(error)
    }
})


module.exports = router;
