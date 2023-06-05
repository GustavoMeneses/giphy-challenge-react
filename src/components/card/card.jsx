import styles from './card.module.css'

export function Card({ title, url }) {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={url}/>
      <p>{title}</p>
    </div>
  )
}