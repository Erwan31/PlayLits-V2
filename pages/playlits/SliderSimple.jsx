import React from 'react'
import { SliderRenderTrack, SliderRenderThumb } from './SlidersOptions';

export default function SliderSimple({ props }) {

    return (
        <div className='sliderPerso'>
            {/* <div className='sliderName'>{this.props.name}</div>
        <span className='labelsRange'>{this.props.labelRange.max || ""}</span> */}
            <Range
                className='sliderRange'
                direction={Direction.Up}
                values={values}
                step={STEP}
                min={props.min}
                max={props.max}
                // onChange={values => modifyValue(values)}
                onFinalChange={props.onFinalChange}
                renderTrack={({ props, children }) =>
                    <SliderRenderTrack {...props}>
                        {children}
                    </SliderRenderTrack>
                }
                renderThumb={({ props, isDragged }) =>
                    <SliderRenderThumb isDragged={isDragged} {...props} />
                }
            />
            <span className='labelsRange'>{props.labelRange.min || ""}</span>
        </div>
    );
}