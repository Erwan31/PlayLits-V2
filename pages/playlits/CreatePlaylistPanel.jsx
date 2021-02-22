import { Box } from '@material-ui/core';
import React, { useState } from 'react'
import CustomInput from '../Components/CustomInput';
import CreatePlaylistButton from './CreatePlaylistButton';

export default function CreatePlaylistPanel() {

    const [input, setInput] = useState("");

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-evenly">
            <CustomInput onChange={handleInputChange} />
            <CreatePlaylistButton name={input} disabled={input === ""} />
        </Box>
    )
}
