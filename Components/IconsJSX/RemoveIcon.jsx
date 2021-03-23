import * as React from "react"

function RemoveIcon(props) {
    return (
        <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x={2} y={2} width={16} height={16} rx={8} fill="#fff" />
            <path
                d="M10 0a9.933 9.933 0 00-7.07 2.93A9.933 9.933 0 000 10a9.933 9.933 0 002.93 7.07A9.933 9.933 0 0010 20a9.933 9.933 0 007.07-2.93A9.933 9.933 0 0020 10a9.933 9.933 0 00-2.93-7.07A9.933 9.933 0 0010 0zm5.5 13.143L13.143 15.5 10 12.357 6.857 15.5 4.5 13.143 7.643 10 4.5 6.857 6.857 4.5 10 7.643 13.143 4.5 15.5 6.857 12.357 10l3.143 3.143z"
                fill="#EC5D57"
            />
        </svg>
    )
}

export default RemoveIcon