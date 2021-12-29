import { useState } from "okra";
import { render } from "okra/dom";
import Stress from "./stress";

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      Count is:{" "}
      <>
        <span>{count}</span>
      </>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

const App = () => {
  // const [test, setTest] = useState(0);

  return true ? (
    <Stress />
  ) : (
    <div>
      <Counter />
      <Counter />
    </div>
  );
};

render(<App />, document.getElementById("app"));
