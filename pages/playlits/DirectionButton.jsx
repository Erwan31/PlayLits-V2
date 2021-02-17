import { Typography } from '@material-ui/core'
import React from 'react'
import CustomButton from './CustomButton'
import DecreaseIcon from './Icons/DecreaseIcon'
import IncreaseIcon from './Icons/IncreaseIcon'

export default function DirectionButton({ direction, onClick }) {

    const handleChange = (param) => () => {
        setChecked((prev) => ({ ...prev, [param]: !prev[param] }));
    };

    return (
        <CustomButton onClick={onClick} color='purple'>
            <Typography align='left' component='h3' variant='subtitle1' style={{ marginRight: '0.5rem' }}>
                Direction
            </Typography>
            {direction === 'asc' ? <IncreaseIcon /> : <DecreaseIcon />}
        </CustomButton>
    )
}
