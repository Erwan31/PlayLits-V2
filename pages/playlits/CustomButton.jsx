import React from 'react'
import Button from '@material-ui/core/Button';

export default function CustomButton({ children, onClick, color }) {

    return (
        <Button
            variant="contained"
            onClick={onClick}
            style={{ backgroundColor: color }}
        >
            {children}
        </Button>
    )
}
