import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCountryDetail } from "../../actions";
import { useEffect } from "react";

import styles from './Detail.module.css'

export default function Detail(){
    const dispatch = useDispatch()
    let params = useParams()

    useEffect(() => {
        dispatch(getCountryDetail(params.id))
    }, [dispatch, params.id])

    const country = useSelector((state) => state.specificCountry)
    document.addEventListener('DOMContentLoaded', function(){
        console.log(country[0])
    })

    // ID para usar de key para el map
    let id = 0

    return (
        country.length ? 
        <div className={styles.flex}>
            <div className={styles.infoPanel}>
                <div className={styles.board}>
                    <div>
                        <h2 className={styles.info}>{country[0].name}</h2>
                    </div>
                    <div>
                        <img className={styles.image} src={country[0].img} alt="la bandera del pais" />
                    </div>
                </div>
                <div className={styles.board}>
                    <h4 className={styles.info}>ISO ID: {country[0].id.toUpperCase()}</h4>
                    <h4 className={styles.info}>CAPITAL: {country[0].capital.toUpperCase()}</h4>
                    <h4 className={styles.info}>POBLACIÓN: {country[0].population} HABITANTES</h4>
                    <h4 className={styles.info}>CONTINENTE: {country[0].continent.toUpperCase()}</h4>
                    <h4 className={styles.info}>REGIÓN: {country[0].subregion.toUpperCase()}</h4>
                    <h4 className={styles.info}>SUPERFICIE: {country[0].area} KM2</h4>
                </div>
            </div>
            
            <div className={styles.boardActivities}>
                <h2 className={styles.info}>Actividades</h2>
                <div className={styles.activities}>
                    {   
                        country[0].hasOwnProperty('activities') ? country[0].activities.map(activity => {
                            id++
                            return (
                                <div key={id} className={styles.info}>
                                    <h3>Nombre: {activity.name}</h3>
                                    <h4>Dificultad: {activity.difficulty}</h4>
                                    <h4>Duración: {activity.duration}</h4>
                                    <h4>Estación: {activity.season}</h4>
                                </div>
                            )
                        })
                        : <div>No se encontraron actividades</div>
                    }
                </div>
            </div>
        </div>
        : <div>No se encontro informacion del pais</div>
    )
}