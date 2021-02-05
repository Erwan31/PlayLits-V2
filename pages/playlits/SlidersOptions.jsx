export function SliderRenderTrack({props, children}) {

    return (
        <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                        ...props.style,
                        flexGrow: 1,
                        width: '36px',
                        display: 'flex',
                        alignSelf: 'center',
                        height: '120px',
                        margin: '15px 15px'
                    }}
                >
                    <div
                        className='thumbRange'
                        ref={props.ref}
                        style={{
                            width: '5px',
                            height: '100%',
                            borderRadius: '4px',
                            background: getTrackBackground({
                                values: this.state.values,
                                colors: [this.props.colors, '#ccc'],
                                min: this.props.min,
                                max: this.props.max,
                                direction: Direction.Up
                            }),
                            alignSelf: 'center',
                            margin: 'auto'
                        }}
                    >
                        {children}
                    </div>
        </div>
    )
}

export function SliderRenderThumb({props, isDrragged}) {

    return (
        <div
            {...props}
            style={{
                ...props.style,
                height: '30px',
                width: '30px',
                borderRadius: '4px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #2C3049',
                outline: 'none'
            }}
        >
            { props.label &&
                <div
                    style={{
                        position: 'absolute',
                        top: '3px',
                        left: '35px',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '11px',
                        fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                        padding: '4px',
                        borderRadius: '4px',
                        backgroundColor: this.props.colors
                    }}
                >
                  666  {/* {this.state.values[0].toFixed(0)} */}
                </div>
            }
            <div
                style={{
                    width: '16px',
                    height: '5px',
                    backgroundColor: isDragged ? props.colors : '#CCC'
                }}
            />
        </div>
    )
}