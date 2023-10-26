import {
  mdiClose,
  mdiDivision,
  mdiMinus,
  mdiPercentOutline,
  mdiPlusMinusVariant,
} from "@mdi/js";
import clsx from "clsx";
import { useReducer } from "react";
import { AppIcon } from "../../Utils/AppIcon.component";
import "./Calculator.styles.scss";
import {
  ActionT,
  CalculatorKeyT,
  IState,
  calculatorReducer,
  initialState,
} from "./calculatorReducer";

const Calculator = () => {
  const [state, dispatch] = useReducer<React.Reducer<IState, ActionT>>(
    calculatorReducer,
    initialState
  );

  const { result } = state;

  function handlePress(key: CalculatorKeyT) {
    dispatch({ type: "Press", payload: key });
  }

  return (
    <section className="calculator-container">
      <header className={clsx("app-window-drag-handle", "calculator-header")} />
      <section className="calculator-show-area">{result}</section>
      <section className="calculator-buttons-container">
        <button
          className="calculator-top-row-button"
          onClick={() => handlePress("AC")}
        >
          {Number(result) > 0 ? "C" : "AC"}
        </button>
        <button
          className="calculator-top-row-button"
          onClick={() => handlePress("+/-")}
        >
          <AppIcon path={mdiPlusMinusVariant} />
        </button>
        <button
          className="calculator-top-row-button"
          onClick={() => handlePress("%")}
        >
          <AppIcon path={mdiPercentOutline} />
        </button>
        <button
          className="calculator-operation-button"
          onClick={() => handlePress("/")}
        >
          <AppIcon path={mdiDivision} />
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(7)}
        >
          7
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(8)}
        >
          8
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(9)}
        >
          9
        </button>
        <button
          className="calculator-operation-button"
          onClick={() => handlePress("*")}
        >
          <AppIcon path={mdiClose} />
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(4)}
        >
          4
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(5)}
        >
          5
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(6)}
        >
          6
        </button>
        <button
          className="calculator-operation-button"
          onClick={() => handlePress("-")}
        >
          <AppIcon path={mdiMinus} size={24} />
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(1)}
        >
          1
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(2)}
        >
          2
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(3)}
        >
          3
        </button>
        <button
          className="calculator-operation-button"
          onClick={() => handlePress("+")}
        >
          +
        </button>
        <button
          className={clsx(
            "calculator-number-button",
            "calculator-curved-bottom-left-button"
          )}
          style={{ gridColumn: "1 / span 2" }}
          onClick={() => handlePress(0)}
        >
          0
        </button>
        <button
          className="calculator-number-button"
          onClick={() => handlePress(".")}
        >
          .
        </button>
        <button
          className={clsx(
            "calculator-operation-button",
            "calculator-curved-bottom-right-button"
          )}
          onClick={() => handlePress("=")}
        >
          =
        </button>
      </section>
    </section>
  );
};

export default Calculator;
