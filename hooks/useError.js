import { useRecoilState, atom } from "recoil";

export const errorState = atom({
  key: 'error',
  default: {
    hasError: false,
    error: {},
  }
});

export default function useError() {
    const [error, setError] = useRecoilState(errorState);

    const handleError = (error) => {
        setError(current => ({ ...current, hasError: true, error: error }));
    }

    const ThrowError = () => {
        // Unset error to be able to come back without triggering a useless error in the component
        setError(current => ({ ...current, hasError: false}));
        throw new Error('I am triggering ErrorBoundary catch!', error);
    }

    const getError = () => {
        return error;
    }

    return {
        error,
        handleError,
        getError,
        ThrowError,
    }
}