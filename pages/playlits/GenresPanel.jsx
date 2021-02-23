import { Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import GenreButton from './GenreButton'

export default function GenresPanel({ genres, onSelect }) {

    const [genresSelected, setGenresSelected] = useState([]);
    const [idsSelected, setIdssSelected] = useState([]);

    const handleGenreSelect = (genre) => () => {
        console.log(genre, 'skjdkjskaaaaaaaa')
        // Toggle genre already present in seletedgenrelist or not
        if (!genresSelected.includes(genre)) {
            setGenresSelected(current => [...current, genre]);
            setIdssSelected(current => [...current, ...genre.ids]);
        }
        else {
            const filtered = genresSelected.filter(el => el !== genre);
            let filteredIds = idsSelected;
            genre.ids.forEach(idEl => filteredIds = filteredIds.filter(id => idEl !== id))
            setGenresSelected(filtered);
            setIdssSelected(filteredIds);
        }
    }

    const isSelected = (data) => () => {
        console.log('isSelected')
        let isSelected = true;
        data.ids.forEach(idEl => isSelected = isSelected && idsSelected.includes(idEl));
        if (isSelected) {
            if (!genresSelected.includes(data)) {
                setGenresSelected(current => [...current, data]);
                setIdssSelected(current => [...current, ...data.ids]);
            }
            return true;
        }
        else false;
    }

    useEffect(() => {
        console.log(genresSelected, idsSelected)
        onSelect(genresSelected);
    }, [genresSelected])

    return (
        <Box
            display="flex"
            flexWrap="wrap"
            css={{ width: '100%' }}
        >
            {genres.length > 0 &&
                genres.map(genre => <GenreButton key={genre.genre} onClick={handleGenreSelect(genre)} data={genre} isSelected={isSelected(genre)} />)
            }
        </Box>
    )
}
