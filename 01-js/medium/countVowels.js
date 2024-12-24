/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Convert the string to lowercase to handle both uppercase and lowercase vowels
  str = str.toLowerCase();

  // Define a set containing all vowels
  const vowels = new Set(["a", "e", "i", "o", "u"]);

  // Initialize a counter for vowels
  let count = 0;

  // Iterate over each character in the string
  for (let char of str) {
    // Check if the character is a vowel
    if (vowels.has(char)) {
      count += 1;
    }
  }

  // Return the total count of vowels
  return count;
}

module.exports = countVowels;
