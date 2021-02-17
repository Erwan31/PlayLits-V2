import { Box, Collapse, Typography } from '@material-ui/core'
import React from 'react'
import { useState } from 'react';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

export default function PanelCollapse({ children, name, icon }) {

    const [open, setOpen] = useState(true);

    const handleChange = () => {
        setOpen(prev => !prev);
    }

    return (
        <Box m="0 0 1rem 0" css={{ cursor: "pointer" }}>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                onClick={handleChange}
                justifyContent="space-between"
                css={{ maxWidth: 110 }}
            >
                {icon}
                <Typography align='left' component='h3' variant='subtitle1'>
                    {name}
                </Typography>
                <ExpandIcon bool={open} />
            </Box>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {children}
            </Collapse>
        </Box>
    )
}

function ExpandIcon({ bool }) {
    return bool ? <ExpandLess color="secondary" /> : <ExpandMore color="secondary" />
}
