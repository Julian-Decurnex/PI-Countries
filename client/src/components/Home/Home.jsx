import React, { Fragment } from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCountries, filter, orderAZ, orderByPopulation} from '../../actions';
import { Link } from "react-router-dom";

// ESTILOS
import styles from './Home.module.css'

// COMPONENTES
import Card from "../Card/Card";

export default function Home(){
    const dispatch = useDispatch()
    let countries = useSelector((state) => state.filteredCountries)

    // PAGINADO
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(9)
    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = countries.length ? countries.slice(indexOfFirstCountry, indexOfLastCountry) : []

    function nextPage(){
        setCurrentPage(currentPage+1)
    }

    function prevPage(){
        setCurrentPage(currentPage-1)
    }

    // CARGAMOS LA STORE CON LOS PAISES
    useEffect(() => {
        dispatch(getCountries())
        setCountriesPerPage(9)
    }, [dispatch])

    //UNA FUNCION PARA REFRESCAR EL COMPONENTE A GUSTO
    const [refrescar, setRefrescar] = useState(0)
    function refrescarComponente(){
        setRefrescar(refrescar+1)
    }

    // MANEJA LA INFORMACION QUE NOS LLEGA DE LOS INPUTS Y LA GUARDA EN EL ESTADO LOCAL
    const [filtros, setFiltros] = useState({
        nombre: '',
        continente: '',
        actividad: '',
        ordenAZ: '',
        poblacion: ''
    })

    function handleFilterChange(e){
        setFiltros({
            ...filtros,
            [e.target.name]: e.target.value
        })
    }

    // EMPEZAMOS A DESPACHAR LOS PEDIDOS DE FILTROS O CAMBIOS DE ORDEN CADA VEZ QUE SE ACTUALIZA UNO DE SUS VALORES O CUANDO CLIQUEAN EN LA OPCION

    useEffect(() => {
        let payload = {
            name: filtros.nombre,
            continent: filtros.continente,
            activity: filtros.actividad
        }
        dispatch(filter(payload))
        setCurrentPage(1)
    }, [dispatch, filtros.nombre, filtros.continente, filtros.actividad])

    function handleOrderByName(e){
        setFiltros({
            ...filtros,
            poblacion: ''
        })
        dispatch(orderAZ(e.target.value))
        refrescarComponente()
    }

    function handleOrderByPopulation(e){
        setFiltros({
            ...filtros,
            ordenAZ: 'asc'
        })
        dispatch(orderByPopulation(e.target.value))
        refrescarComponente()
    }

    return (
        <Fragment>
            <div className={styles.flexMain}>
                <div className={styles.flexMenu}>
                    <h2 className={`${styles.input} ${styles.title}`}>AVENTURAS POR LOS SIETE MARES</h2>
                    <div className={styles.input}>
                        <Link to='/activity'>
                            <button className={styles.activity}>NUEVA AVENTURA</button>
                        </Link>
                    </div>
                    <div className={styles.input}>
                        <h3>BUSCAR PAIS</h3>
                        <input name='nombre' placeholder="Nombre..." onChange={(e) => handleFilterChange(e)}></input>
                    </div>
                    <div className={styles.input}>
                        <h3>BUSCAR AVENTURA</h3>
                        <input name="actividad" placeholder="Actividad..." onChange={(e) => handleFilterChange(e)}></input>
                    </div>
                    <div className={styles.input}>
                        <h3>FILTRAR CONTINENTE</h3>
                        <select name="continente" onChange={(e) => handleFilterChange(e)}>
                            <option value="">Todos</option>
                            <option value="Africa">Africa</option>
                            <option value="Asia">Asia</option>
                            <option value="Americas">Americas</option>
                            <option value="Europe">Europa</option>
                            <option value="Antarctic">Antartica</option>
                            <option value="Oceania">Oceania</option>
                        </select>
                    </div>
                    <div className={styles.input}>
                        <h3>ORDENAR ALFABETICAMENTE</h3>
                        <select name="ordenAZ" onChange={(e) => handleOrderByName(e)}>
                            <option value="asc">Ascendente</option>
                            <option value="desc">Descendente</option>
                        </select>
                    </div>
                    <div className={styles.input}>
                        <h3>ORDENAR POR POBLACION</h3>
                        <select name="poblacion" onChange={(e) => handleOrderByPopulation(e)}>
                            <option value="">Elige</option>
                            <option value="asc">Menor a Mayor</option>
                            <option value="desc">Mayor a Menor</option>
                        </select>
                    </div>

                    {/* <div className={styles.input}>
                        <h3>CANTIDAD DE PAISES POR PAGINA</h3>
                        <select onChange={(e) => handleCountriesPerPage(e)}>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div> */}
                    
                    {
                        <div className={styles.flexButton}>
                            {   
                                currentPage === 1 ? <button className={`${styles.hidden} ${styles.button}`}>Anterior</button> : <button className={styles.button} onClick={() => prevPage()}>Anterior</button>
                            }
                            {
                                currentPage < countries.length/countriesPerPage ? <button className={styles.button} onClick={() => nextPage()}>Siguiente</button> : <button className={`${styles.hidden} ${styles.button}`}>Anterior</button>
                            }
                        </div>
                    }
                </div>
                <div className={styles.flexCards}>
                    {
                        currentCountries.length ? currentCountries.map(country => {
                            return (
                                <Link key={country.id} to={'/home/' + country.id}>
                                    <Card key={country.id} params={country}/>
                                </Link>
                            )
                        })
                        : <div>Cargando paises...</div>
                    }
                </div>
            </div>
        </Fragment>
    )
}