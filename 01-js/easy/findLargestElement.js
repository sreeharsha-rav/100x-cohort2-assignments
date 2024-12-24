/*
  Write a function `findLargestElement` that takes an array of numbers and returns the largest element.
  Example:
  - Input: [3, 7, 2, 9, 1]
  - Output: 9
*/

function findLargestElement(numbers) {
  const largestElement = numbers.reduce((largest, current) => {
    if (current > largest) {
      return current;
    } else {
      return largest;
    }
  }, numbers[0]);

  return largestElement;
}

module.exports = findLargestElement;
