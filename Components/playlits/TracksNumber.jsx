import { Typography, Tooltip } from '@material-ui/core'
import React from 'react'
import CustomButton from '../CustomButton'
import DecreaseIcon from '../IconsJSX/DecreaseIcon'
import IncreaseIcon from '../IconsJSX/IncreaseIcon'

export default function TracksNumber({ number }) {

    return (
        <CustomButton onClick={null}>
            <Typography align='left' component='h3' variant='subtitle1' style={{ marginRight: '0.5rem' }}>
                {number} Tracks
            </Typography>
        </CustomButton>
    )
}
