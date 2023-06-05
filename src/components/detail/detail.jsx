import { Card } from "../card/card";
import styles from './detail.module.css'

export function Detail({ value }) {
  return (
    <div className={styles.container}>
      <Card
        title={value.title}
        url={value.images.original.url}
      />
    </div>
  )
}