import { Modal, Typography } from '@material-ui/core';
import React from 'react'
import CustomButton from '../CustomButton';
export default function ErrorFallback({ error }) {

    console.log(error, 'is it actually working?');

    return (
        <>
            Oalalalal
            <Modal
                open="true"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <>
                    <Typography>
                        Oops...something went wrong, sorry about that!
                    </Typography>
                    <CustomButton>Take me back to Login Page</CustomButton>
                </>
            </Modal>
        </>
    )
}
