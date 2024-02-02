import React from 'react';
import {ACTIONS} from "./App";

// Button component that accepts children, onClick, and additional className as props
export default function OperationButton ({operation, dispatch, onClick, className = '' }) {
    function handleClick() {
        if (operation === "AC") {
            dispatch({type: ACTIONS.CLEAR})
        } else if (operation === "=") {
            dispatch({ type: ACTIONS.EVALUATE})
        } else if (operation === "C") {
            dispatch({ type: ACTIONS.DELETE_DIGIT})
        } else {
            dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
        }
    }

    return (
        <button
            className={`rounded-2xl bg-buttons active:bg-opacity-70 font-sans text-3xl font-bold shadow-sm transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${className}`}
            //data-ripple-dark="true"
            onClick={handleClick}
        >
            {operation}
        </button>
    );
};
