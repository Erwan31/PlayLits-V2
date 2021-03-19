import React from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '../../styles/Home.module.css'
import ErrorBoundary from '../Errors/ErrorBoundary'
import useError from '../../hooks/useError'
import { useRouter } from 'next/router'

export default function HeaderFooter({ children, backButton }) {
    const { getError } = useError();
    const router = useRouter();

    console.log(router.pathname);

    return (
        <main className={styles.container}>
            <Header backButton={backButton} />
            <ErrorBoundary getError={getError} route={router.pathname}>
                {children}
            </ErrorBoundary>
            <Footer />
        </main>
    )
}

