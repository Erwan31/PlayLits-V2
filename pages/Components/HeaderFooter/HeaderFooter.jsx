import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '../../../styles/Home.module.css'

export default function HeaderFooter({ children, backButton }) {
    return (
        <div className={styles.container}>
            <Header backButton={backButton} />
            {children}
            <Footer />
        </div>
    )
}
