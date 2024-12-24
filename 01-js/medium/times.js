/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

function calculateSumAndTime(n) {
  const startTime = new Date().getTime();

  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }

  const endTime = new Date().getTime();
  const timeTaken = (endTime - startTime) / 1000;

  // Return the sum and the time taken
  return { sum, timeTaken };
}

const result1 = calculateSumAndTime(100);
console.log(
  `Sum from 1 to 100: ${result1.sum}, Time taken: ${result1.timeTaken} seconds`,
);

const result2 = calculateSumAndTime(100000);
console.log(
  `Sum from 1 to 100000: ${result2.sum}, Time taken: ${result2.timeTaken} seconds`,
);

const result3 = calculateSumAndTime(1000000000);
console.log(
  `Sum from 1 to 1000000000: ${result3.sum}, Time taken: ${result3.timeTaken} seconds`,
);
