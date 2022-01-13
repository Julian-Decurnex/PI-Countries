import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { addActivity, getCountries } from "../../actions"
// import video from '../../video/fondo_brujula.mp4'
import styles from './Activity.module.css'

function validate(input){
    let errors = {}
    if(!input.name) {
        errors.name = 'Debes ingresar un nombre!'
    } else {
        errors.name = ''
    }
    if(!input.difficulty) {
        errors.difficulty = 'Debes definir una dificultad!'
    } else {
        errors.difficulty = ''
    }
    if(!input.duration) {
        errors.duration = 'Debes especificar una duración!'
    } else {
        errors.duration = ''
    }
    if(!input.season) {
        errors.season = 'Debes elegir una temporada!'
    } else {
        errors.season = ''
    }
    if(!input.countries.length) {
        errors.countries = 'Debes elegir al menos un pais!'
    } else {
        errors.countries = ''
    }
    return errors
}

export default function Activity(){

    const dispatch = useDispatch()
    const countries = useSelector((state) => state.allCountries)

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const [state, setState] = useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        countries: []
    })

    const [errors, setErrors] = useState({
        name: 'Debes ingresar un nombre!',
        difficulty: 'Debes definir una dificultad!',
        duration: 'Debes especificar una duración!',
        season: 'Debes elegir una temporada!',
        countries: 'Debes elegir al menos un pais!'
    })


    function handleInputChange(e){
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    function handleAddCountries(e){
        setState({
            ...state,
            [e.target.name]: state.countries.concat(e.target.value)
        })
        setErrors(validate({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    function handleSubmit(e){
        e.preventDefault()
        addActivity(state)
        setState({
            name: '',
            difficulty: '',
            duration: '',
            season: '',
            countries: []
        })
        setErrors({
            name: 'Debes ingresar un nombre!',
            difficulty: 'Debes definir una dificultad!',
            duration: 'Debes especificar una duración!',
            season: 'Debes elegir una temporada!',
            countries: 'Debes elegir al menos un pais!'
        })
    }

    function handleRemoveCountries(country){
        setState({
            ...state,
            countries: state.countries.filter(name => name === country)
        })
    }

    return (
        <div className={styles.body}>
            <video autoPlay loop muted>
                <source src="https://www.dropbox.com/s/b2c23xrb9b4bfxk/fondoBrujula.mp4?dl=0" type="video/mp4"/>
                Tu navegador no soporta el fondo de pantalla
            </video>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h3 className={styles.title}>CREA TU PROPIA AVENTURA!</h3>
                <div>
                    <h3>NOMBRE</h3>
                    <input onChange={(e) => {handleInputChange(e)}} name='name' type="text" value={state.name} placeholder="Nombre de actividad..."/>
                    {errors.name ? <p>{errors.name}</p> : null}
                </div>
                <div>
                    <h3>DIFICULTAD</h3>
                    <select onChange={(e) => {handleInputChange(e)}} name="difficulty" value={state.difficulty}>
                        <option value=''>Elige una dificultad...</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                    {errors.difficulty ? <p>{errors.difficulty}</p> : null}
                </div>
                <div>
                    <h3>DURACION</h3>
                    <input onChange={(e) => {handleInputChange(e)}} name='duration' type="text" placeholder="Ingresa la duración..." value={state.duration}/>
                    {errors.duration ? <p>{errors.duration}</p> : null}
                </div>
                <div>
                    <h3>TEMPORADA</h3>
                    <select onChange={(e) => {handleInputChange(e)}} name="season" value={state.season}>
                        <option value=''>Elige una estación...</option>
                        <option value="Summer">Verano</option>
                        <option value="Winter">Invierno</option>
                        <option value="Spring">Primavera</option>
                        <option value="Autumn">Otoño</option>
                    </select>
                    {errors.season ? <p>{errors.season}</p> : null}
                </div>
                <div>
                    <h3>PAIS</h3>
                    <select name="countries" onChange={(e) => handleAddCountries(e)} value=''>
                        <option value=''>Elige los paises donde se llevara a cabo tu aventura...</option>
                        {countries.map(country => {
                            return <option key={country.id} value={country.name}>{country.name}</option>
                            })
                        }
                    </select>
                    <br/>
                    {state.countries.map(country => {
                        return <span key={country}>| {country}<button className={styles.remove} onClick={() => handleRemoveCountries(country)}>X</button> | </span>
                    })}
                    {errors.countries ? <p>{errors.countries}</p> : null}
                </div>
                {
                    errors.name || errors.duration || errors.season || errors.difficulty
                    ? <h3 className={styles.error}>Faltan campos requeridos</h3> 
                    : <div>
                        <button className={styles.button} type="Submit">CREAR</button>
                    </div>
                }
            </form>
            
        </div>
    )
}