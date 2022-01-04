import styles from './Music.module.css';
import audio from '../../audio/audio.mp3';
import { useEffect } from 'react';

export default function Music(){

    useEffect(() => {
        let player = document.getElementById('player')
        player.volume = 0.2
    }, [])

    function handleAudioControl(){
        let button = document.getElementById('controlButton')
        let player = document.getElementById('player')
        if(button.innerHTML === 'Escuchar Música'){
            button.innerHTML = 'Detener Música'
            player.play()
        } else {
            button.innerHTML = 'Escuchar Música'
            player.pause()
        }
    }

    function increaseVolume(){
        let player = document.getElementById('player')
        if(player.volume < 0.9) player.volume += 0.1
    }

    function decreaseVolume(){
        let player = document.getElementById('player')
        if(player.volume > 0.1) player.volume -= 0.1
        
    }

    return (
        <div className={styles.audio}>
            <audio id='player' loop>
                <source src={audio} type='audio/mp3'/>
            </audio>
            <button className={styles.buttonControl} id='controlButton' onClick={() => handleAudioControl()}>Escuchar Música</button>
            <button className={styles.buttonVolume} onClick={() => decreaseVolume()}>-</button>
            <button className={styles.buttonVolume} onClick={() => increaseVolume()}>+</button>
        </div>
    )
}