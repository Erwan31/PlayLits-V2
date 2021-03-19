import { Modal, Typography, makeStyles, Box, Backdrop } from '@material-ui/core';
import React from 'react'
import CustomButton from '../CustomButton';
import Link from 'next/link'

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noFocus: {
        '&:focus': {
            outline: 'none',
            boxShadow: 'none',
        }
    }
}));

export default function ErrorFallbackHome({ error }) {

    const classes = useStyles();

    return (
        <Modal
            open="true"
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Box display="flex" flexDirection="column" alignItems="center" className={classes.noFocus}>
                <Typography gutterBottom>
                    Oops...something went wrong, sorry about that <span role="img" aria-label="anger">❗</span>
                </Typography>
                <Link href="/">
                    <CustomButton>
                        <Typography align='left' variant="body2" style={{ marginRight: '0.5rem' }}>
                            Take me back to the Login Page
                        </Typography>
                    </CustomButton>
                </Link>
            </Box>
        </Modal>
    )
}
