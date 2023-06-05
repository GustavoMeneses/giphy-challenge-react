import styles from './search-bar.module.css'

export function SearchBar({ handleChange }) {
  return (
    <input className={styles.input} onChange={handleChange}/>
  )
}