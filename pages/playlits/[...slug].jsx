import { Box, Paper } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import classNames from 'classnames'
import CreatePlaylistPanel from '../../Components/playlits/Containers/CreatePlaylistPanel';
import PlaylitsPanel from '../../Components/playlits/Containers/PlaylitsPanel';
import TrackList from '../../Components/playlits/Containers/TrackList'
import HeaderFooter from '../../Components/HeaderFooter/HeaderFooter';
import ScrollBarsCustom from '../../Components/ScrollBarsCustom';
import LoadingRings from '../../Components/LoadingRings'
import { getPlaylistData } from '../../hooks/getPlaylistData';
import useError from '../../hooks/useError';
import to from 'await-to-js';
import useMainState from '../../hooks/useMainState';
import useSortState from '../../hooks/useSortState';

// Basically what await-to-js is doing
// https://dev.to/sobiodarlington/better-error-handling-with-async-await-2e5m
// const handle = (promise) => {
//     return promise
//         .then(data => ([data, undefined]))
//         .catch(error => Promise.resolve([undefined, error]));
// }

const useStyles = makeStyles(theme => ({
    playlitsPanel: {
        backgroundColor: '#2C3049',
        // minHeight: 200,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    responsiveContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        padding: '80px 2rem 0 2rem',
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
        },
    },
    marginBottom: {
        marginBottom: theme.spacing(3)
    }
}));

/* Framer Motion Variants */
const container = {
    hidden: { opacity: 0, scale: 1 },
    visible: {
        opacity: [0, 1],
        scale: 1,
        transition: {
            ease: 'easeIn',
            // delay: 0.3,
            // delayChildren: 0.3,
            // staggerChildren: 0.4
        }
    },
    exit: {
        opacity: [1, 0, 0, 0],
        scale: [1, 0.5, 1],
        transition: {
            ease: 'easeOut',
            // delayChildren: 0.3,
            // staggerChildren: 0.4
        }
    }
};

export default function Playlits() {
    const classes = useStyles();
    const { error, handleError, ThrowError } = useError();
    const { state } = useMainState();
    const { initSortState, sortedTracks } = useSortState();

    useEffect(() => {
        async function initData() {
            const [err, init] = await to(getPlaylistData(state));
            if (err) { handleError(err) };

            initSortState(init);
        }

        initData();
    }, []);

    return (
        <HeaderFooter backButton={true}>
            {error.hasError && <ThrowError />}
            <ScrollBarsCustom
                height={'100vh'}
                width={'100%'}
                autoHide={true}
                autoHideTimeout={500}
                autoHideDuration={200}
                universal={true}
            >
                {sortedTracks.length === 0 ?
                    <LoadingRings />
                    :
                    <motion.div
                        className="container"
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={classes.responsiveContainer}
                    >
                        <Box
                            m='1rem auto'
                            css={{
                                maxWidth: 650,
                                minWidth: 350,
                                width: '100%'
                            }}
                        >
                            <Paper elevation={15} className={classes.playlitsPanel}>
                                <PlaylitsPanel />
                            </Paper>
                            <Paper elevation={15} className={classNames(classes.marginBottom, classes.playlitsPanel)}>
                                <CreatePlaylistPanel sortedTracks={sortedTracks.actual} />
                            </Paper>
                        </Box>
                        <Box
                            p='0 0.5rem'
                            css={{
                                maxWidth: 650,
                                minWidth: 350,
                                width: '100%'
                            }}
                        >
                            <TrackList list={sortedTracks.actual} />
                        </Box>
                    </motion.div>}
            </ScrollBarsCustom>
        </HeaderFooter>
    )
}
