import { Typography, Tooltip } from '@material-ui/core'
import React from 'react'
import CustomButton from '../CustomButton'
import DecreaseIcon from '../../pages/utils/IconsJSX/DecreaseIcon'
import IncreaseIcon from '../../pages/utils/IconsJSX/IncreaseIcon'

export default function DirectionButton({ direction, onClick }) {

    const handleChange = (param) => () => {
        setChecked((prev) => ({ ...prev, [param]: !prev[param] }));
    };

    return (
        <CustomButton onClick={onClick}>
            {/* <Tooltip title="Change the ascending/descending order of your track list (see Sliders & Charts)" placement="right-end"> */}
            <div>
                <Typography align='left' component='h3' variant='subtitle1' style={{ marginRight: '0.5rem' }}>
                    Direction
            </Typography>
            </div>
            {/* </Tooltip> */}
            {direction === 'asc' ? <IncreaseIcon /> : <DecreaseIcon />}
        </CustomButton>
    )
}
