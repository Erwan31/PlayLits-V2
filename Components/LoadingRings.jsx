import { Box, Typography } from '@material-ui/core'
import React from 'react'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default function LoadingRings() {
    return (
        <Box
            m='auto'
            display="flex"
            alignItems="center"
            justifyContent="center"
            css={{
                height: '100%',
                width: '100%',
                opacity: 0.7,
            }}
        >
            <Loader type="Rings"
                color="#EEEEEE"
                height={60}
                width={60}
            />
            <Typography
                align='left'
                component='h3'
                variant='subtitle1'
                style={{ marginRight: '0.5rem' }}
            >
                Loading...
                        </Typography>
        </Box>
    )
}
