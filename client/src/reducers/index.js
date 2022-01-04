const initialState = {
    allCountries: [],
    filteredCountries: [],
    specificCountry: {}
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_COUNTRIES':
            let countries = action.payload
            .sort(function(a, b) {
                if(a.name > b.name){
                    return 1
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            })
            return {
                ...state,
                allCountries: countries,
                filteredCountries: countries
            }
        case 'GET_DETAIL':
            return {
                ...state,
                specificCountry: action.payload
            }

        case 'FILTER':
            let filtered = state.allCountries
            if(action.payload.name) filtered = filtered.filter(country => country.name.toLowerCase().includes(action.payload.name.toLowerCase()))
            if(action.payload.continent) filtered = filtered.filter(country => country.continent === action.payload.continent)
            if(action.payload.activity){
                filtered = filtered.filter(country => country.activities.length !== 0)
                filtered = filtered.filter(country => {
                    let target = false
                    country.activities.map(activity => {
                        if(activity.name.toLowerCase().includes(action.payload.activity.toLowerCase())) return target = true
                        return false
                    })
                    return target
                })
            }
            return {
                ...state,
                filteredCountries: filtered
            }

        case 'ORDER_AZ':
            let orderedAZ = action.payload === 'asc' ?
                state.filteredCountries.sort(function(a, b) {
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name) {
                        return -1
                    }
                    return 0
                }) :
                state.filteredCountries.sort(function(a, b) {
                    if(a.name > b.name){
                        return -1
                    }
                    if(b.name > a.name) {
                        return 1
                    }
                    return 0
                })
                return {
                    ...state,
                    filteredCountries: orderedAZ
                }
        case 'ORDER_POPULATION':
            let orderedByPopulation = action.payload === 'asc' ?
            state.filteredCountries.sort(function(a, b) {
                if(a.population > b.population){
                    return 1
                }
                if(b.population > a.population) {
                    return -1
                }
                return 0
            }) :
            state.filteredCountries.sort(function(a, b) {
                if(a.population > b.population){
                    return -1
                }
                if(b.population > a.population) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                filteredCountries: orderedByPopulation
            }
        case 'ADD_ACTIVITY':
            return {
                ...state
            }
        default:
            return state
    }
}