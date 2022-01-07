import React, { Component, Fragment } from "react";
import {connect} from 'react-redux';

import Card from "./Card/Card";
import { Link } from "react-router-dom";
import styles from './Home/Home.module.css'

import {getCountries, filter, orderAZ, orderByPopulation} from '../actions';

class HomeClass extends Component {
    constructor(props){
        super(props)
        this.filtros = {
            nombre: '',
            continente: '',
            actividad: '',
            ordenAZ: '',
            poblacion: ''
        }

        // PAGINADO

        this.currentPage = 1
        this.countriesPerPage = 9
        this.indexOfLastCountry = this.currentPage * this.countriesPerPage
        this.indexOfFirstCountry = this.indexOfLastCountry - this.countriesPerPage
        this.currentCountries = this.props.countries.length ? this.props.countries.slice(this.indexOfFirstCountry, this.indexOfLastCountry) : []

        this.nextPage = function(){
            this.currentPage += 1
            console.log(this.currentCountries)
        }

        this.prevPage = function(){
            this.currentPage -= 1
        }

        //FILTROS

        this.handleFilterChange = function(e){
            this.filtros = {
                ...this.filtros,
                [e.target.name]: e.target.value
            }
            let payload = {
                name: this.filtros.nombre,
                continent: this.filtros.continente,
                activity: this.filtros.actividad
            }
            filter(payload)
        }

        this.handleOrderByName = function(e){
            this.filtros = {
                ...this.filtros,
                [e.target.name]: e.target.value
            }
            orderAZ(e.target.value)
        }

        this.handleOrderByPopulation = function(e){
            this.filtros = {
                ...this.filtros,
                [e.target.name]: e.target.value
            }
            orderByPopulation(e.target.value)
        }
    }

    componentDidMount(){
        this.props.getCountries()
    }

    render() {
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
                            <input name='nombre' placeholder="Nombre..." onChange={(e) => this.handleFilterChange(e)}></input>
                        </div>
                        <div className={styles.input}>
                            <h3>BUSCAR AVENTURA</h3>
                            <input name="actividad" placeholder="Actividad..." onChange={(e) => this.handleFilterChange(e)}></input>
                        </div>
                        <div className={styles.input}>
                            <h3>FILTRAR CONTINENTE</h3>
                            <select name="continente" onChange={(e) => this.handleFilterChange(e)}>
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
                            <select name="ordenAZ" onChange={(e) => this.handleOrderByName(e)}>
                                <option value="asc">Ascendente</option>
                                <option value="desc">Descendente</option>
                            </select>
                        </div>
                        <div className={styles.input}>
                            <h3>ORDENAR POR POBLACION</h3>
                            <select name="poblacion" onChange={(e) => this.handleOrderByPopulation(e)}>
                                <option value="">Elige</option>
                                <option value="asc">Menor a Mayor</option>
                                <option value="desc">Mayor a Menor</option>
                            </select>
                        </div>
                        
                        {
                            <div className={styles.flexButton}>
                                {   
                                    this.currentPage === 1 ? <button className={`${styles.hidden} ${styles.button}`}>Anterior</button> : <button className={styles.button} onClick={() => this.prevPage()}>Anterior</button>
                                }
                                {
                                    this.currentPage < this.props.countries.length/this.countriesPerPage ? <button className={styles.button} onClick={() => this.nextPage()}>Siguiente</button> : <button className={`${styles.hidden} ${styles.button}`}>Anterior</button>
                                }
                            </div>
                        }
                    </div>
                    <div className={styles.flexCards}>
                        {
                            this.currentCountries.length ? this.currentCountries.map(country => {
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
}

const mapStateToProps = (state) => {
    return{
        countries: state.filteredCountries 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCountries: () => dispatch(getCountries()),
        filter: () => dispatch(filter()),
        orderAZ: () => dispatch(orderAZ()),
        orderByPopulation: () => dispatch(orderByPopulation())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeClass)