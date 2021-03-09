import React from 'react'
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import classNames from 'classnames'

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        maxWidth: 700,
        maxHeight: 600,
        // marginTop: 80,
    },
    icons: {
        top: 'calc(50 % - 20px)',
        position: 'absolute',
        // background: 'white',
        background: 'linear-gradient(to right bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
        backdropFilter: 'blur(5rem)',
        borderRadius: '30px',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '18px',
        zIndex: 10,
    },
    next: {
        right: '10px',
    },
    prev: {
        left: ' 10px',
    },
    image: {
        width: '100%',
        height: '100%',
    }
}));

const images = [
    "/static/images/Slide-1.png",
    "/static/images/Slide-2.png",
    "/static/images/Slide-3.png",
    "/static/images/Slide-4.png",
];

const directionOffset = 800;

const variants = {
    enter: (direction) => {
        return {
            // x: direction > 0 ? directionOffset : -directionOffset,
            opacity: 0,
        };
    },
    center: {
        zIndex: 1,
        // x: 0,
        opacity: 1,
        transition: {
            // delay: 0.1,
            duration: 0.4,
            ease: "easeInOut"
        }
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            // x: direction < 0 ? directionOffset : -directionOffset,
            opacity: 0,
        };
    }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
// const swipeConfidenceThreshold = 100;
// const swipePower = (offset, velocity) => {
//     return Math.abs(offset) * velocity;
// };



export default function WelcomeCarousel() {

    const classes = useStyles();
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.
    const imageIndex = wrap(0, images.length, page);

    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className={classes.root}>
            {/* <AnimatePresence className={classes.image} initial={false} custom={direction}> */}
            <motion.img
                className={classes.image}
                key={page}
                src={images[imageIndex]}
                // custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                exitBeforeEnter
                style={{ borderRadius: '0.5rem' }}
            />
            {/* </AnimatePresence> */}
            <div className={classNames(classes.prev, classes.icons)} onClick={() => paginate(-1)}>
                <ArrowBackIcon />
            </div>
            <div className={classNames(classes.next, classes.icons)} onClick={() => paginate(1)}>
                <ArrowForwardIcon />
            </div>
        </div>
    );
};

