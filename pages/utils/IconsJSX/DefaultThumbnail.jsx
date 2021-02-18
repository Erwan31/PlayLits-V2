import * as React from "react"

function DefaultThumbnail(props) {
    return (
        <svg
            width={150}
            height={150}
            viewBox="0 0 150 150"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M97 50.562l-2.376.5-32 6-1.624.25v26.814A7.86 7.86 0 0057 83c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8V68.624l28-5.248v14.748A7.86 7.86 0 0089 77c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8V50.562zm-4 4.812v4l-28 5.252v-4l28-5.252zM89 81c2.234 0 4 1.766 4 4s-1.766 4-4 4-4-1.766-4-4 1.766-4 4-4zm-32 6c2.234 0 4 1.766 4 4s-1.766 4-4 4-4-1.766-4-4 1.766-4 4-4z"
                fill="gray"
            />
            <path fill="#C4C4C4" fillOpacity={0.5} d="M0 0h150v150H0z" />
        </svg>
    )
}

export default DefaultThumbnail;
