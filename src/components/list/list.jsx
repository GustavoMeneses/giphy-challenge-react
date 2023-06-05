import { Card } from "../card/card"
import styles from './list.module.css'

export function List({ listValues, handleClick }) {
  return (
    <div className={styles.container}>
      {listValues.length ? 
        listValues.map((value) => {
        return (
          <div onClick={() => handleClick(value)} key={value.id}>
            <Card
              title={value.title}
              url={value.images['480w_still'].url}
            />
          </div>
        )
      }) :
      <></>}
    </div>
  )
}