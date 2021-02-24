import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CustomButton from '../../Components/CustomButton'
import FavoriteIcon from '@material-ui/icons/Favorite';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

// const useStyles = makeStyles((theme) => ({

// }))

export default function OnlySavedButton({ onlySaved, onClick }) {

    // const classes = useStyles();

    const handleChange = (param) => () => {
        setChecked((prev) => ({ ...prev, [param]: !prev[param] }));
    };

    return (
        <CustomButton onClick={onClick} color={onlySaved ? '#7CCC6C' : '#D62598'}>
            <Typography align='left' component='h3' variant='subtitle1' style={{ marginRight: '0.5rem' }}>
                {onlySaved ? 'All Onboard' : 'Only the Loved ones'}
            </Typography>
            {onlySaved ? <span role="img" aria-label="sheep">🌈</span> : <span role="img" aria-label="sparkling-heart">💖</span>}
        </CustomButton>
    )
}
