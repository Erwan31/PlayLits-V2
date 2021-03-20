import { Typography, Tooltip } from '@material-ui/core'
import React from 'react'
import CustomButton from '../CustomButton'

export default function FilterButton({ lowPassFilter, onClick }) {

    return (
        <CustomButton onClick={onClick} color={lowPassFilter ? '#00B054' : '#FF5542'}>
            <Typography align='left' component='h3' variant='subtitle2' style={{ marginRight: '0.5rem' }}>
                Keep <span style={{ color: '#2C3049' }}>{lowPassFilter ? 'Lowest' : 'Highest'}</span> values
            </Typography>
        </CustomButton>
    )
}
