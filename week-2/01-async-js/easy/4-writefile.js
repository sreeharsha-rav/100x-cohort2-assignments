const fs = require("fs");

// Content to be written to the file
const content = "This is the content to be written to the file.";

// Write to the file asynchronously
fs.writeFile("output.txt", content, "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File has been written");
});

// Expensive operation
function expensiveOperation() {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  console.log("Expensive operation completed");
}

// Call the expensive operation
expensiveOperation();
