import { useRecoilState, atom } from "recoil";

export const errorState = atom({
  key: 'error',
  default: {
    hasError: false,
    error: {},
  }
});

export let errorVar = null;

export default function useError() {
    const [error, setError] = useRecoilState(errorState);

    const handleError = (error) => {
        // console.log('useError', error)
        errorVar = { hasError: true, error: error };
        setError(current => ({ ...current, hasError: true, error: error }));
    }

    const ThrowError = () => {
        throw new Error('I am triggering ErrorBoundary catch!');
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