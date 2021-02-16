import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';

export default function ScrollBarsCustom({ children, ...props }) {

    const { height, width, hasHorizontal, hasVertical } = props;

    const renderView = ({ style, ...props }) => {
        const thumbStyle = {
            // backgroundColor: 'pink'
            // Options for scroll overflowXY hidden or scroll or auto
            // overflowX: hasHorizontal ? 'scroll' : 'hidden',
            // overflowY: hasVertical ? 'scroll' : 'hidden',
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props} />
        );
    }

    // const renderThumbHorizontal = ({ style, ...props }) => {

    //     const display = hasHorizontal ? 'auto' : 'hidden';
    //     const thumbStyle = {
    //         backgroundColor: 'green',
    //         overflowX: display,
    //     };
    //     return (
    //         <div
    //             style={{ ...style, ...thumbStyle }}
    //             {...props} />
    //     );
    // }

    // const renderThumbVertical = ({ style, ...props }) => {

    //     const display = hasVertical ? 'auto' : 'hidden';
    //     const thumbStyle = {
    //         backgroundColor: 'green',
    //         overflowY: display,
    //     };
    //     return (
    //         <div
    //             style={{ ...style, ...thumbStyle }}
    //             {...props} />
    //     );
    // }

    return (
        <Scrollbars
            // autoWidth
            // autoWidthMin={200}
            // autoWidthMax={600}
            // autoHide
            // autoHideTimeout={500}
            // autoHideDuration={200}
            renderView={renderView}
            // renderThumbHorizontal={renderThumbHorizontal}
            // renderThumbVertical={renderThumbVertical}
            style={{ width: width, height: height }}
            thumbMinSize={50}
            universal={true}
        >
            {children}
        </Scrollbars>
    )
}
