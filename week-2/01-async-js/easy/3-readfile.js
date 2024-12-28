const fs = require("fs");

// Read the file asynchronously
fs.readFile("3-read-from-file.md", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("File contents:", data);
});

// Expensive operation
function expensiveOperation() {
  console.log("Running expensive operation");
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  console.log("Expensive operation completed");
}

// Call the expensive operation
expensiveOperation();
