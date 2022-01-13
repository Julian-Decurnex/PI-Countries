import axios from 'axios';

export function getCountries(){
    return async function(dispatch){
        let countries = await axios.get('/countries')
        return dispatch({
            type: 'GET_COUNTRIES',
            payload: countries.data
        })
    }
}

export function getCountryDetail(payload){
    return async function(dispatch){
        let country = await axios.get('/countries/' + payload)
        return dispatch({
            type: 'GET_DETAIL',
            payload: country.data
        })
    }
}

export function filter(payload){
    return {
        type: 'FILTER',
        payload
    }
}

export function orderAZ(payload){
    return {
        type: 'ORDER_AZ',
        payload
    }
}

export function orderByPopulation(payload){
    return {
        type: 'ORDER_POPULATION',
        payload
    }
}

export function addActivity(payload){
    axios({
        method: 'POST',
        url: '/activity',
        data: {
            "name": payload.name,
            "difficulty": payload.difficulty,
            "duration": payload.duration,
            "season": payload.season,
            "country": payload.countries
        }
    })
    return {
        type: 'ADD_ACTIVITY',
        payload: payload
    }
}