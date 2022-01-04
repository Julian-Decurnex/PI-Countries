import React from "react";
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'
import video from '../../video/fondo1.mp4'

export default function LandingPage(){
    return (
        <div className={styles.body}>
            <div className={styles.background}>
                <video autoPlay loop muted>
                    <source src={video} type="video/mp4"/>
                </video>
            </div>
            <div className={styles.main}>
                <h1>AVENTURAS POR LOS SIETE MARES</h1>
                <Link to='/home'>
                    <button className={styles.button}>INGRESAR</button>
                </Link>
            </div>
        </div>
    )
}