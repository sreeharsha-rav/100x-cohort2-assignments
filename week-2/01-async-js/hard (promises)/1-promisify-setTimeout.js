/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

function wait(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      console.log("Finished setTimeout");
    }, n * 1000);
  });
}

const n = 3;
wait(n).then(() => {
  console.log(`Promise resolved after ${n} seconds.`);
});

module.exports = wait;
