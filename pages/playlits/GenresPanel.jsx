import { Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import GenreButton from './GenreButton'

export default function GenresPanel({ allGenres, onSelect }) {

    const [genresSelected, setGenresSelected] = useState([]);

    const handleGenreSelect = (genre) => () => {
        if (!genresSelected.includes(genre)) {
            setGenresSelected(current => [...current, genre]);
        }
        else {
            const filtered = genresSelected.filter(el => el !== genre);
            setGenresSelected(filtered);
        }
    }

    useEffect(() => {
        onSelect(genresSelected);
    }, [genresSelected])

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            css={{ width: '100%' }}
        >
            {allGenres.length > 0 &&
                allGenres.map(genre =>
                    <GenreButton key={genre} onClick={handleGenreSelect(genre)}>{genre}</GenreButton>)
            }
        </Box>
    )
}
