import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import ChartsIcon from '../utils/IconsJSX/ChartsIcon'
import GenresIcon from '../utils/IconsJSX/GenresIcon'
import SlidersIcon from '../utils/IconsJSX/SlidersIcon'
import Charts from './Charts'
import DirectionButton from './DirectionButton'
import GenresPanel from './GenresPanel'
import PanelCollapse from './PanelCollapse'
import SliderPanel from './SliderPanel'
import { slidersSimple, slidersDouble } from './slidersData'

const useStyles = makeStyles(theme => ({
    title: {
        marginBottom: theme.spacing(0.5),
        color: 'transparent',
        backgroundClip: 'text',
        '-webkit-background-clip': 'text',
        background: 'linear-gradient(135deg, #EEEEEE 0%, rgba(85,107,242,1) 50%, rgba(169,80,254,1) 100%)',
    },
    marginBottom: {
        marginBottom: theme.spacing(2),
    },
}));

export default function PlaylitsPanel({ genres, sortedTracks, direction, handleGenresSelect, handleDirection }) {

    const classes = useStyles();

    return (
        <div>
            <Typography align='center' component='h2' variant='h5' classes={{ root: classes.title }}>
                PlayLits Panel
            </Typography>
            <div className={classes.marginBottom}>
                <DirectionButton direction={direction} onClick={handleDirection} />
            </div>
            <PanelCollapse name={"Sliders"} icon={<SlidersIcon />}>
                <SliderPanel list={sortedTracks} slidersSimple={slidersSimple} slidersDouble={slidersDouble} direction={direction} />
            </PanelCollapse>
            <PanelCollapse name={"Charts"} icon={<ChartsIcon />}>
                <Charts sliders={slidersSimple} list={sortedTracks} />
            </PanelCollapse>
            <PanelCollapse name={"Genres"} icon={<GenresIcon />}>
                <GenresPanel genres={genres} onSelect={handleGenresSelect} />
            </PanelCollapse>
        </div>
    )
}

// playlistTracks.allGenres
