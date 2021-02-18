import { Box, Paper, TextField, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import PlaylitsPage from './playlits/PlaylitsPage'
import HeaderFooter from '../Components/HeaderFooter/HeaderFooter'
import { mainState, selectedPlaylist, SLIDERSINIT, slidersState } from '../States/states'
import { useRecoilState } from 'recoil';
import { getArtistsGenres, getTracksAudioFeatures, getUserPlaylistTracks } from '../api';
import TrackList from './TrackList';
import ScrollBarsCustom from '../Components/ScrollBarsCustom';
import { useState } from 'react'
import { sortList, changeTracksNumber } from './utils';
import PanelCollapse from './PanelCollapse';
import SlidersIcon from '../utils/IconsJSX/SlidersIcon';
import GenresIcon from '../utils/IconsJSX/GenresIcon';
import ChartsIcon from '../utils/IconsJSX/ChartsIcon';
import SliderPanel from './SliderPanel';
import Charts from './Charts';
import { slidersDouble, slidersSimple } from './slidersData';
import DirectionButton from './DirectionButton';
import { reverseOrder } from './utils'
import CreatePlaylistButton from './CreatePlaylistButton';
import { getArrayOfArtistsIDs, getArrayOfGenres, getArtistsNames } from '../utils/getters';

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

function dataStructureTracks(playlist, audioFeatures, genres) {
    const struct = [];

    playlist.items.forEach((el, index) =>
        struct[index] = {
            item: playlist.items[index],
            audioFeature: audioFeatures[index],
            genres: genres[index],
        }
    )

    console.log(struct, 'shdjshdjfsdhjshdjshjdh')

    return struct;
}

export default function Playlits() {

    const classes = useStyles();
    const [state, setState] = useRecoilState(mainState);
    const [playlistTracks, setPlaylistTracks] = useRecoilState(selectedPlaylist);
    const [sortedTracks, setSortedTracks] = useState([]);
    const [slidersValues, setSliderValue] = useRecoilState(slidersState);
    const [direction, setDirection] = useState('asc');
    const [input, setInput] = useState("");

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
        //get tracks albums genres
        const artistsData = await getArtistsGenres(data, state.token.access_token)
        const allGenres = getArrayOfGenres(artistsData.artists);
        const genres = artistsData.artists.map(artist => artist.genres);

        setPlaylistTracks(current => ({
            ...current,
            info: data.info,
            items: data.items,
            audioFeatures,
            genres,
            allGenres
        }));
        setSortedTracks(dataStructureTracks(data, audioFeatures, genres));
        setSliderValue(current => ({ ...current, tracks: [0, audioFeatures.length] }));
    }, []);


    // Compute coeff and sort tracks
    useEffect(() => {
        if (sortedTracks.length > 0) {
            // Sorting by Coeff based on features sliders values
            let sorted = sortList(slidersValues, sortedTracks);

            // Sorting based on direction
            if (direction !== 'asc') {
                sorted = reverseOrder(sorted);
            }

            // Sorting based on tracks slider -> placed here so that its retrieving the right part of the list
            sorted = changeTracksNumber(sorted, slidersValues.tracks);

            // // Sorting by genres 
            // sorted = sorted.filter(el => el !== playlistTracks.includes(...el.allGenres));

            setSortedTracks(sorted)
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
                    {
                        // Place skeleton here
                        sortedTracks.length > 0 &&
                        <Paper elevation={15} className={classes.playlitsPanel}>
                            <Typography align='center' component='h2' variant='h5' classes={{ root: classes.title }}>
                                PlayLits Panel
                        </Typography>
                            <div className={classes.marginBottom}>
                                <DirectionButton direction={direction} onClick={handleDirection} />
                            </div>
                            <PanelCollapse name={"Sliders"} icon={<SlidersIcon />}>
                                <SliderPanel slidersSimple={slidersSimple} slidersDouble={slidersDouble} direction={direction} />
                            </PanelCollapse>
                            <PanelCollapse name={"Charts"} icon={<ChartsIcon />}>
                                <Charts sliders={slidersSimple} list={sortedTracks} />
                            </PanelCollapse>
                            <PanelCollapse name={"Genres"} icon={<GenresIcon />}>
                                {playlistTracks.allGenres.length > 0 && playlistTracks.allGenres.map(genre => <span>{genre}, </span>)}
                            </PanelCollapse>
                        </Paper>
                    }
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
                            <CreatePlaylistButton name={input} disabled={input === ""} />
                        </Box>
                    </Paper>
                    {sortedTracks.length > 0 && <TrackList list={sortedTracks} />}
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


