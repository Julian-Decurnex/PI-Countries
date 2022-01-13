import styles from './Background.module.css'
import video from '../../video/paisajesDelMundo.mp4'

export default function Background(){
    return (
        <div className={styles.background}>
            <video autoPlay loop muted>
                <source src={video} type="video/mp4"/>
            </video>
        </div>
    )
}