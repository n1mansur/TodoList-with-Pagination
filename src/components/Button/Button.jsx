import React, { useState } from 'react'
import styles from './Button.module.scss'

export default function Button(text) {
  return (
    <div className={styles.position}>
      <label className={styles.onOffButton} onClick={(e) => onClick(e)}>
        <input type="checkbox" />
        <span className={styles.span}></span>
        <span className={styles.theme}>{text}</span>
      </label>
    </div>
  )
}
