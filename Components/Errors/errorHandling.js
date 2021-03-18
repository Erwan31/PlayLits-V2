import { useRecoilState } from "recoil";
import { errorState } from "../../utils/States/states";

export default function handleError(info = {}) {
    // const [error, setError] = useRecoilState(errorState);
    
    // setError(current => ({ ...current, hasError: true, info }));
    
    return (
        <>Error</>
    )
}

