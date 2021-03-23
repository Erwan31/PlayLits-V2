import * as React from "react"

function CheckedIcon(props) {
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
                d="M9.997 0C4.48 0 0 4.48 0 9.997 0 15.52 4.48 20 9.997 20 15.52 20 20 15.52 20 9.997 20 4.48 15.52 0 9.997 0zm6.522 8.505L9.49 14.936a2.32 2.32 0 01-1.55.61 2.306 2.306 0 01-1.822-.92l-2.8-3.723a1.319 1.319 0 01.26-1.847 1.324 1.324 0 011.854.26l2.56 3.396 6.736-6.158a1.322 1.322 0 012.198.739c.078.435-.058.894-.408 1.212z"
                fill="#70C041"
            />
        </svg>
    )
}

export default CheckedIcon