import { useRecoilState } from "recoil";
import { errorState } from "../../utils/States/states";
import ThrowError from "./ThrowError";

export default function handleError(response) {
    return (
        <ThrowError response={response} />
    )
}

