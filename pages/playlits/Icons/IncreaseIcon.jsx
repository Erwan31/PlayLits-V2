import * as React from "react"

function IncreaseIcon(props) {
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
                d="M15.347 4.008l-3.671.637c-.438.077-.607.574-.287.854l.91.839-3.57 3.308-2.594-2.392a.873.873 0 00-1.162 0L.24 11.603a.718.718 0 000 1.071.87.87 0 00.573.218.87.87 0 00.572-.218l4.143-3.82 2.628 2.391a.873.873 0 001.162 0l4.143-3.82.91.838c.32.296.858.14.925-.264l.691-3.385c.084-.358-.253-.668-.64-.606z"
                fill="#EEE"
            />
        </svg>
    )
}

export default IncreaseIcon;
