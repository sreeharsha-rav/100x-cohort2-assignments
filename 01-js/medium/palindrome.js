/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

// Helper function to check if a character is alphanumeric
function isAlphanumeric(char) {
  return /^[a-z0-9]+$/i.test(char);
}

function isPalindrome(str) {
  // Convert the string to lowercase to handle case insensitivity
  str = str.toLowerCase();

  let left = 0;
  let right = str.length - 1;

  while (left < right) {
    // skip non-alphanumeric characters
    while (left < right && !isAlphanumeric(str[left])) {
      left++;
    }
    while (left < right && !isAlphanumeric(str[right])) {
      right--;
    }

    // compare
    if (str[left] !== str[right]) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

module.exports = isPalindrome;
