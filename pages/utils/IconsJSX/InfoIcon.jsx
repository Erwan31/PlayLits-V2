import React from 'react'

export default function InfoIcon(props) {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M8 .031A7.969 7.969 0 108 15.97 7.969 7.969 0 008 .03zm-.11 2.922a1.19 1.19 0 110 2.383 1.19 1.19 0 110-2.383zm1.86 10.094h-3.5v-1.418h.778v-4.13h-.07a.708.708 0 110-1.416h2.019v5.546h.774v1.418z"
                fill={props.color || '#fff'}
            />
        </svg>
    )
}

