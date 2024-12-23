/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  // If lengths are not equal after preprocessing, they cannot be anagrams
  if (str1.length !== str2.length) {
    return false;
  }

  str1 = str1.trim().toLowerCase();
  str2 = str2.trim().toLowerCase();

  // Create a hashmap to count character frequencies
  let charCount = {};

  // Update the character count for the first string
  for (let char of str1) {
    charCount[char] = (charCount[char] || 0) + 1;
  }

  // Decrement the character count for the second string
  for (let char of str2) {
    if (!charCount[char]) {
      return false; // If a character is not found or count is zero, they are not anagrams
    }
    charCount[char]--;
  }

  // Check if all counts in the hashmap are zero
  for (let count in charCount) {
    if (charCount[count] !== 0) {
      return false;
    }
  }

  return true;
}

module.exports = isAnagram;
