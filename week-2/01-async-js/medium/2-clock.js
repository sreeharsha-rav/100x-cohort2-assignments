function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  // Add leading zeros if necessary
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds}`;
}

function formatTime12Hour(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Add leading zeros if necessary
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function showTime() {
  const now = new Date();
  const time24 = formatTime(now);
  const time12 = formatTime12Hour(now);

  console.log(`24-hour format: ${time24}`);
  console.log(`12-hour format: ${time12}`);
}

setInterval(showTime, 1000);
