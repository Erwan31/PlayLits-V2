import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { getLinearColor } from '../utils/getters';
import CustomButton from './CustomButton'

export default function GenreButton({ children, onClick }) {

    const [selected, setSelected] = useState(false);

    const handleSelection = () => {
        // pass back the genre selected
        console.log('prpojkdj')
        onClick(children);
        setSelected(!selected);
    };

    return (
        <div style={{ margin: '0.5rem' }}>
            <CustomButton onClick={handleSelection} color={!selected ? 'purple' : 'grey'}>
                <Typography align='left' variant="body2" style={{ marginRight: '0.5rem' }}>
                    {children}
                </Typography>
            </CustomButton>
        </div>
    )
}
