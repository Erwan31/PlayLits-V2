import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '../../styles/Home.module.css'
import { Modal, Typography, Backdrop, makeStyles } from '@material-ui/core'
import CustomButton from '../CustomButton'
import { useRecoilState } from 'recoil';
import { errorState } from '../../utils/States/states'
import WelcomeCarousel from '../index/WelcomeCarousel'
import ErrorBoundary from '../Errors/ErrorBoundary'


export default function HeaderFooter({ children, backButton }) {
    return (
        <main className={styles.container}>
            <Header backButton={backButton} />
            <ErrorBoundary>
                {children}
            </ErrorBoundary>
            <Footer />
            {/* <ErrorFallBack open={open} /> */}
        </main>
    )
}

