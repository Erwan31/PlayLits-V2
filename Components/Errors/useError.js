import { useReducer } from "react";

function reducer(state, action) {
    switch (action.type) {

        case 'THROW_ERROR':
            return {...state, hasError: true, response: action.payload}
        default:
            return state;
    }
}

const initialState = {
    hasError: false,
    response: {},
}

export default function useError() {
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const throwError = (error = {}) => {
        dispatch({ type: 'THROW_ERROR', payload: error.response });
    }

    return {
        state,
        throwError
    }
}