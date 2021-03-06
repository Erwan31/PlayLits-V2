import { Typography, Tooltip } from '@material-ui/core'
import React from 'react'
import CustomButton from '../CustomButton'
import DecreaseIcon from '../IconsJSX/DecreaseIcon'
import IncreaseIcon from '../IconsJSX/IncreaseIcon'

export default function TracksNumber({ number }) {

    return (
        <CustomButton onClick={null} color={'#7080F4'} disableElevation>
            <Typography align='left' component='h3' variant='subtitle2' style={{ marginRight: '0.5rem' }}>
                {number} Tracks
            </Typography>
        </CustomButton>
    )
}
