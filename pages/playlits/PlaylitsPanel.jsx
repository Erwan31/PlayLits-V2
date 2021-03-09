import { Box, makeStyles, Tooltip, Typography, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import ChartsIcon from '../utils/IconsJSX/ChartsIcon'
import GenresIcon from '../utils/IconsJSX/GenresIcon'
import InfoIcon from '../utils/IconsJSX/InfoIcon'
import SlidersIcon from '../utils/IconsJSX/SlidersIcon'
import DirectionButton from './Components/DirectionButton'
import GenresPanel from './GenresPanel'
import SliderPanel from './SliderPanel'
import OnlySavedButton from './Components/OnlySavedButton'
import PanelCollapse from './Components/PanelCollapse'
import Charts from './Components/Charts'
import { slidersSimple, slidersDouble } from './slidersData'
import classNames from 'classnames'
// import { motion } from 'framer-motion'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import WelcomeCarousel from '../Components/index/WelcomeCarousel'

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
    centerContentButton: {
        width: 210,
        display: "flex",
        justifyContent: 'center',
    },
    iconSize: {
        width: 16,
        height: 16,
    },
    relative: {
        position: 'relative',
    },
    positionCorner: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    pointer: {
        cursor: 'pointer',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noFocus: {
        '&:focus': {
            outline: 'none',
            boxShadow: 'none',
        }
    }
}));

export default function PlaylitsPanel({ genres, sortedTracks, direction, onlySaved, handleGenresSelect, handleDirection, handleOnlySaved }) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.relative}>
            <InfoIcon color={'#A452FD'} className={classNames(classes.positionCorner, classes.pointer)} onClick={handleOpen} />
            <Typography gutterBottom align='center' component='h2' variant='h5' classes={{ root: classNames(classes.marginBottom, classes.title) }}>
                PlayLits Panel
                 <IconButton className={classes.iconSize}>
                    <InfoIcon />
                </IconButton>
            </Typography>
            <Box
                display="flex"
                justifyContent="space-evenly"
                flexWrap="wrap"
                className={classes.marginBottom}
            >
                <DirectionButton direction={direction} onClick={handleDirection} />
                <div className={classes.centerContentButton}>
                    <OnlySavedButton onlySaved={onlySaved} onClick={handleOnlySaved} />
                </div>
            </Box>
            <PanelCollapse name={"Sliders"} icon={<SlidersIcon />}>
                {sortedTracks.length > 0 &&
                    <SliderPanel list={sortedTracks} slidersSimple={slidersSimple} slidersDouble={slidersDouble} direction={direction} />}
            </PanelCollapse>
            <PanelCollapse name={"Charts"} icon={<ChartsIcon />}>
                {sortedTracks.length > 0 &&
                    <Charts sliders={slidersSimple} list={sortedTracks} />}
            </PanelCollapse>
            <PanelCollapse name={"Genres"} icon={<GenresIcon />}>
                {sortedTracks.length > 0 &&
                    <GenresPanel genres={genres} onSelect={handleGenresSelect} />}
            </PanelCollapse>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className={classes.noFocus}>
                    <WelcomeCarousel />
                </div>
            </Modal>
        </div>
    )
}
