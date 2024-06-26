import "./App.css";
import { useReducer, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";
import OperationButton from "./OperationButton";
import DigitButton from "./DigitButton";

// Action types
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

// Reducer function to manage calculator state
function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (
        payload.digit === "." &&
        (state.currentOperand == null || state.currentOperand.includes("."))
      )
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    default:
      return state;
  }
}

// Function to evaluate the expression
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return "";
  }
  return computation.toString();
}

// Function to format the operand for display
const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

// Main App component
function App() {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle dark mode
  function toggleDarkMode() {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  }

  // Reducer state management
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {},
  );

  return (
    <main
      className={`${darkMode && "dark"} transition duration-500 ease-in-out main bg-[#E7E7E8] flex justify-center items-center h-screen`}
    >
      <div className="flex flex-col shadow-xl screen bg-screenPrimary w-[390px] h-[844px] rounded-[30px]">
        <div className="px-8 py-3 font-bold phone-bar text-numbers">
          <p>
            {new Date().toLocaleTimeString("en-US", {
              hour12: false,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div
          className="flex h-12 w-28 cursor-pointer self-center rounded-xl p-2 shadow-sm bg-screenSecondary"
          onClick={toggleDarkMode}
        >
          <div
            className={`flex-1 flex justify-center items-center ${darkMode ? "bg-darkSelected" : "bg-lightSelected"}`}
          >
            <SunIcon
              className={`${!darkMode ? "h-8 w-8 text-numbers" : "h-6 w-6 text-gray-600"}`}
            />
          </div>
          <div
            className={`flex-1 flex justify-center items-center ${!darkMode ? "bg-darkSelected" : "bg-lightSelected"}`}
          >
            <MoonIcon
              className={`${darkMode ? "h-6 w-6 text-numbers" : "h-5 w-5 text-gray-600"}`}
            />
          </div>
        </div>

        <div className="flex flex-grow flex-col justify-end p-6 px-10 text-end text-2xl font-bold text-numbers">
          <p className={`m-2`}>
            {formatOperand(previousOperand)} {operation}
          </p>
          <h1 className={`text-6xl`}>{formatOperand(currentOperand)}</h1>
        </div>

        <div className="h-3/5 w-full p-6 pb-16 bg-screenSecondary rounded-[30px]">
          <div className="grid h-full grid-cols-4 grid-rows-5 gap-4 keyboard">
            <OperationButton
              className="text-mathOperationsTop"
              operation="AC"
              dispatch={dispatch}
            />
            <OperationButton
              className="text-mathOperationsTop"
              operation="C"
              dispatch={dispatch}
            />
            <OperationButton
              className="text-mathOperationsTop"
              operation="%"
              dispatch={dispatch}
            />
            <OperationButton
              className="text-mathOperationsTop"
              operation="÷"
              dispatch={dispatch}
            />
            <DigitButton digit="7" dispatch={dispatch} />
            <DigitButton digit="8" dispatch={dispatch} />
            <DigitButton digit="9" dispatch={dispatch} />
            <OperationButton
              className="text-mathOperationsRight"
              operation="x"
              dispatch={dispatch}
            />
            <DigitButton digit="4" dispatch={dispatch} />
            <DigitButton digit="5" dispatch={dispatch} />
            <DigitButton digit="6" dispatch={dispatch} />
            <OperationButton
              className="text-mathOperationsRight"
              operation="-"
              dispatch={dispatch}
            />
            <DigitButton digit="1" dispatch={dispatch} />
            <DigitButton digit="2" dispatch={dispatch} />
            <DigitButton digit="3" dispatch={dispatch} />
            <OperationButton
              className="text-mathOperationsRight"
              operation="+"
              dispatch={dispatch}
            />
            <DigitButton digit="." dispatch={dispatch} />
            <DigitButton digit="0" dispatch={dispatch} />
            <OperationButton
              className="col-span-2 text-mathOperationsRight"
              operation="="
              dispatch={dispatch}
            />
          </div>
          <hr className="mx-auto h-1 w-36 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10" />
        </div>
      </div>
    </main>
  );
}

export default App;
