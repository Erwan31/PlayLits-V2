import React, { useEffect, useLayoutEffect, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import styles from '../../styles/Home.module.css'
import { Modal, Typography, Backdrop } from '@material-ui/core'
import CustomButton from '../CustomButton'
import { useRecoilState } from 'recoil';
import { errorState } from '../../utils/States/states'
import WelcomeCarousel from '../index/WelcomeCarousel'
import { ErrorBoundary } from 'react-error-boundary'

// let errorVar = null;

// export function errorHandler(e) {
//     errorVar = e;
// }

export default function HeaderFooter({ children, backButton }) {

    const [open, setOpen] = useState(false);

    const handleError = () => {
        setOpen(true);
        console.log('Error trigger modal nah??')
    }
    return (
        <main className={styles.container}>
            <ErrorBoundary onError={handleError}>
                <Header backButton={backButton} />
                {children}
                <Footer />
            </ErrorBoundary>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                // className={classes.modal}
                open={open}
                // onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div>
                    <WelcomeCarousel />
                </div>
            </Modal>
        </main>
    )
}
