import React from 'react';
import {ACTIONS} from "./App";

// Button component that accepts children, onClick, and additional className as props
export default function DigitButton ({ dispatch, digit, className = '' }) {
    return (
        <button
            className={`rounded-2xl text-numbers bg-buttons active:bg-opacity-70 font-sans text-3xl font-bold shadow-sm transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105 ${className}`}
            //data-ripple-dark="true"
            onClick={() =>
                dispatch({type: ACTIONS.ADD_DIGIT, payload:{digit}})}
        >
            {digit}
        </button>
    );
};
