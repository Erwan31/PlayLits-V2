import * as React from "react"

function DecreaseIcon(props) {
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
                d="M15.584 12.608l-1.152-4.304a.592.592 0 00-.992-.272l-.896.896-2.832-2.8a.943.943 0 00-.672-.272H4.944L2.032 2.928a.956.956 0 00-1.344 0 .956.956 0 000 1.344l3.2 3.2a.943.943 0 00.672.272h4.08l2.544 2.544-.896.896c-.32.32-.176.88.272.992l4.304 1.152c.432.128.832-.272.72-.72z"
                fill="#EEE"
            />
        </svg>
    )
}

export default DecreaseIcon
