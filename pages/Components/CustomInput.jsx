import { makeStyles, TextField, withStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root: {
        color: 'white'
    }
}))

export default function CustomInput({ onChange }) {

    const classes = useStyles();

    return (
        <CssTextField
            label="New PlayLits Name"
            placeholder="PlayLits from ..."
            onChange={onChange}
            color="secondary"
            classes={{ root: classes.root }}
            InputLabelProps={{
                style: {
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    width: '100%',
                    color: '#DDDDDD'
                }
            }}
            InputProps={{
                style: {
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    width: '100%',
                    color: '#DDDDDD'
                }
            }}
        />
    )
}

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'purple',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#DDDDDD',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#ffffff', // Solid underline on hover
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'purple',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'purple',
            },
            '&:hover fieldset': {
                borderColor: 'blue',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'purple',
            },
        },
    },
})(TextField);
