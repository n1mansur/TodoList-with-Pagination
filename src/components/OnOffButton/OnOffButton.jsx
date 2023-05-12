import React, { useState } from 'react'
import styles from './OnOffButton.module.scss'

export default function OnOffButton() {
  const [text, setText] = useState('DARK')
  const onClick = (e) => {
    const wrapper = document.getElementById('wrapper')
    if (e.target.checked) {
      setText('LIGHT')
      wrapper.style.cssText = `
    background: #333;
      `
    } else {
      setText('DARK')
      wrapper.style.cssText = `
      background: #fff;
        `
    }
  }
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
