import React from 'react'
import Button from '@material-ui/core/Button';

export default function CustomButton({ children, onClick = null, color = 'purple', disabled = false }) {

    return (
        <Button
            variant="contained"
            onClick={onClick}
            style={{ backgroundColor: color }}
            disabled={disabled}
        >
            {children}
        </Button>
    )
}