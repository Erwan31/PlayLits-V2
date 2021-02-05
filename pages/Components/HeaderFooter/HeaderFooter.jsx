import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '../../../styles/Home.module.css'

export default function HeaderFooter({ children }) {
    return (
        <div className={styles.container}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
