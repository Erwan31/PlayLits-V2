import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { getLinearColor } from '../../utils/getters';
import CustomButton from '../CustomButton'

export default function GenreButton({ onClick, data, isSelected }) {

    const [selected, setSelected] = useState(false);

    const handleSelection = () => {
        // pass back the genre selected
        onClick(data);
        setSelected(!selected);
    };

    useEffect(() => {
        setSelected(isSelected);
    }, [isSelected]);

    return (
        <div style={{ margin: '0.5rem' }}>
            <CustomButton onClick={handleSelection} color={!selected ? '#7438FD' : 'grey'}>
                <Typography align='left' variant="body2" style={{ marginRight: '0.5rem' }}>
                    {data.genre}
                </Typography>
            </CustomButton>
        </div>
    )
}
