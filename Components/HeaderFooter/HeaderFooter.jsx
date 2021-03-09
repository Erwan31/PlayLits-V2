import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '../../styles/Home.module.css'
import ErrorBoundary from '../../pages/utils/ErrorBoundary'

export default function HeaderFooter({ children, backButton }) {
    return (
        <ErrorBoundary>
            <div className={styles.container}>
                <Header backButton={backButton} />
                {children}
                <Footer />
            </div>
        </ErrorBoundary>
    )
}
