import { useState, useCallback, memo } from "react";

// Create a counter component with increment and decrement functions.
// Pass these functions to a child component which has buttons to perform the increment
// and decrement actions. Use useCallback to ensure that these functions are not recreated
// on every render.

export function Assignment1() {
  const [count, setCount] = useState(0);

  const handleIncrement = useCallback(() => {
    console.log("Increment");
    setCount((currCount) => currCount + 1);
  }, []);

  const handleDecrement = useCallback(() => {
    console.log("Decrement");
    setCount((currCount) => currCount - 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <CounterButtons
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
      />
    </div>
  );
}

const CounterButtons = memo(({ onIncrement, onDecrement }) => {
  console.log("CounterButtons Render");
  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <button onClick={onDecrement}>Decrement</button>
    </div>
  );
});
