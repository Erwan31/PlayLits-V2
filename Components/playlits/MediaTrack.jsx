import React, {useMemo, useState} from "react";
import SpotifyIcon from "../IconsJSX/SpotifyIcon";
import {getArtistsNames, getTrackAlbumImage, linkToSpotify} from "../../utils/getters";
import {CardMedia, makeStyles, Tooltip} from "@material-ui/core";
import {motion} from "framer-motion";

const useStyles = makeStyles((theme) => ({
    mediaCard: {
        position: "relative",
        marginRight: theme.spacing(3),
        cursor: "pointer",
    },
    cover: {
        width: 80,
        height: 80,
        borderRadius: theme.spacing(0.5),
    },
}));

export default function MediaTrack({ track, hovering }) {

    const [hovered, setHovered] = useState(hovering);
    const classes = useStyles();

    useMemo(() => {
        setHovered(hovering);
    }, [hovering]);

    const handleClick = (data) => () => {
        linkToSpotify(data);
    };

    return (
        <Tooltip title="PLAY ON SPOTIFY" arrow placement="left">
            <motion.div
                // whileHover={{}}
                animate={{
                    scale: hovered ? 1.1 : 1,
                    transition: {
                        duration: 0.15,
                        ease: "easeIn"
                    }
                }}
                className={classes.mediaCard}
                onClick={handleClick(track)}
            >
                <CardMedia
                    className={classes.cover}
                    image={getTrackAlbumImage(track.item).url}
                    title={getArtistsNames(track.item)}
                    style={{ opacity: hovered ? 0.7 : 1 }}
                />
                <motion.div
                    style={{
                        position: "absolute",
                        top: "calc(50% - 10px)",
                        left: "calc(50% - 10px)",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                >
                    <SpotifyIcon />
                </motion.div>
            </motion.div>
        </Tooltip>
    );
}