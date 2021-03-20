import ThrowError from "./ThrowError";

export default function handleError(response) {
    return (
        <ThrowError response={response} />
    )
}

