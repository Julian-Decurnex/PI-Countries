import styles from './Card.module.css'

export default function Card({params}){
    return (
        <div className={styles.card}>
            <h3 className={styles.h3}>{params.name} ({params.id})</h3>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={params.img} alt='la bandera del  pais'></img>
            </div>
        </div>
    )
}