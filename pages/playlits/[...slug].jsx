import { Box, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import PlaylitsPage from './playlits/PlaylitsPage'
import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import { mainState, selectedPlaylist, slidersState } from '../States/states'
import { useRecoilState } from 'recoil';
import { getTracksAudioFeatures, getUserPlaylistTracks } from '../api';
import TrackList from './TrackList';
import ScrollBarsCustom from '../Components/ScrollBarsCustom';
import { useState } from 'react'
import { sortListItemsAndAF, changeTracksNumber } from './utils';
import PanelCollapse from './PanelCollapse';
import SlidersIcon from './Icons/SlidersIcon';
import GenresIcon from './Icons/GenresIcon';
import ChartsIcon from './Icons/ChartsIcon';
import SliderPanel from './SliderPanel';
import Charts from './Charts';
import { slidersDouble, slidersSimple } from './slidersData';
import DirectionButton from './DirectionButton';
import { reverseOrder } from './utils'
import CreatePlaylistButton from './CreatePlaylistButton';

const useStyles = makeStyles(theme => ({
    playlitsPanel: {
        backgroundColor: '#2C3049',
        // minHeight: 200,
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
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
    input: {
        color: 'white'
    }
}));

export default function Playlits() {

    const classes = useStyles();
    const [state, setState] = useRecoilState(mainState);
    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    const [sortedTracks, setSortedTracks] = useState({ items: playlistTracks.items, audioFeatures: playlistTracks.audioFeatures });
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    const [direction, setDirection] = useState('asc');
    const [input, setInput] = useState("")

    const handleDirection = () => {
        direction === 'asc' ? setDirection('desc') : setDirection('asc');
    }

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    // API call -> to externalize into a reducer
    useEffect(async () => {
        const data = await getUserPlaylistTracks(state.selectedPlaylist.info, state.token.access_token);
        const audioFeatures = await getTracksAudioFeatures(data, state.token.access_token);

        setPlaylistTracks(current => ({ ...current, info: data.info, items: data.items, audioFeatures }));
        setSortedTracks(current => ({ ...current, items: data.items, audioFeatures }));
        setSliderValue(current => ({ ...current, tracks: [0, audioFeatures.length] }));
    }, []);

    // Compute coeff and sort tracks
    useEffect(() => {
        if (sortedTracks.items.length > 0) {
            // Sorting by Coeff based on features sliders values
            let sorted = sortListItemsAndAF(slidersValues, 'genres', playlistTracks);

            // Sorting based on tracks slider
            sorted = changeTracksNumber(sorted, slidersValues.tracks);

            // Sorting based on direction
            if (direction !== 'asc') {
                sorted.items = reverseOrder(sorted.items);
                sorted.audioFeatures = reverseOrder(sorted.audioFeatures);
            }

            setSortedTracks(current => ({ ...current, items: sorted.items, audioFeatures: sorted.audioFeatures }))
        }
    }, [slidersValues, direction]);

    return (
        <HeaderFooter>
            <ScrollBarsCustom
                height={'100vh'}
                width={'100%'}
                // hasHorizontal={true}
                // hasVertical={false}
                // autoWidth
                // autoWidthMin={200}
                // autoWidthMax={600}
                autoHide
                autoHideTimeout={500}
                autoHideDuration={200}
                // style={{ width: '100%', height: 220 }}
                // thumbMinSize={50}
                universal={true}
            >
                <Box
                    m='auto'
                    p='80px 0 0 0'
                    css={{
                        maxWidth: 600,
                        minWidth: 350,
                    }}
                >
                    <Paper elevation={15} className={classes.playlitsPanel}>
                        <Typography align='center' component='h2' variant='h5' classes={{ root: classes.title }}>
                            PlayLits Panel
                        </Typography>
                        <div className={classes.marginBottom}>
                            <DirectionButton direction={direction} onClick={handleDirection} />
                        </div>
                        <PanelCollapse name={"Sliders"} icon={<SlidersIcon />}>
                            <SliderPanel slidersSimple={slidersSimple} slidersDouble={slidersDouble} />
                        </PanelCollapse>
                        {sortedTracks.audioFeatures.length > 0 &&
                            <PanelCollapse name={"Charts"} icon={<ChartsIcon />}>
                                <Charts sliders={slidersSimple} audioFeatures={sortedTracks.audioFeatures} />
                            </PanelCollapse>
                        }
                        <PanelCollapse name={"Genres"} icon={<GenresIcon />}>
                            {/* <Charts sliders={slidersSimple} audioFeatures={sortedTracks.audioFeatures} /> */}
                        </PanelCollapse>
                    </Paper>
                    <Paper elevation={15} className={classes.playlitsPanel}>
                        <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-evenly">
                            <CssTextField
                                label="New PlayLits Name"
                                placeholder="PlayLits from ..."
                                onChange={handleInputChange}
                                color="secondary"
                                classes={{ root: classes.input }}
                                InputLabelProps={{
                                    style: {
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        width: '100%',
                                        color: '#DDDDDD'
                                    }
                                }}
                                InputProps={{
                                    style: {
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        width: '100%',
                                        color: '#DDDDDD'
                                    }
                                }}
                            />
                            <CreatePlaylistButton name={input} disabled={input !== ""} />
                        </Box>
                    </Paper>
                    {sortedTracks.items.length > 0 && <TrackList list={sortedTracks.items} />}
                </Box>
            </ScrollBarsCustom>
        </HeaderFooter>
    )
}

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'purple',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#DDDDDD',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#ffffff', // Solid underline on hover
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'purple',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'purple',
            },
            '&:hover fieldset': {
                borderColor: 'blue',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'purple',
            },
        },
    },
})(TextField);


