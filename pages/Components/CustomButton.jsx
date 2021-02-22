import React from 'react'
import Button from '@material-ui/core/Button';

export default function CustomButton({ children, onClick, color, disabled = false }) {

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
