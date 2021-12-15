import moment from "moment";

const delay = require("delay");

async function waitFor(config, maxPolls = 40) {
  let result = "";
  const message = config.message || "waiting for task to finish";
  let index = 0;
  do {
    result = await config.do();
    if (index !== 0) {
      console.log(`${config.title} - ${message}, poll #${index}`);
    };
    index++;
    await delay(config.delay || 500);
  } while ((index <= maxPolls) && config.while(result));
  return result;
};


function getRandom(num) {
  return Math.floor(Math.random() * num);
};

function getRandomFromRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getIndex(arr) {
  const randomNum = getRandom(arr.length);
  return arr[randomNum];
};

// function to get defined amount (n) of elements from array with unique indexes
function getElementsFromArray(array, n) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, n);
};

const oneDayInMilliseconds = (1000 * 60 * 60 * 24) - 140000;

function getDaysInMilliseconds(days = 1) {
  return oneDayInMilliseconds * days;
};

function formatToISODateString(date) {
  return date.toISOString().substring(0, 10);
};

function getTimestampInSeconds() {
  return Math.floor((new Date()).getTime() / 1000);
}

function getDifferenceInSeconds(start, end) {
  return (end - start) / 1000;
}

function ifArrHasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}

function randomCase(string) {
  return string
    .split("")
    .map(char => {
      const val = Math.random();
      if (val >= 0.5) return char.toUpperCase();
      return char.toLowerCase();
    })
    .join("");
}

function createDateRange(datesRange) {
  const toDate = new Date();
  toDate.setUTCHours(0);
  toDate.setUTCMinutes(0);
  toDate.setUTCSeconds(0);
  toDate.setUTCMilliseconds(0);
  const fromDate = new Date(toDate - (1000 * 60 * 60 * 24 * datesRange));
  return {
    from: fromDate,
    to: toDate,
    isInRange: function (date) {
      return date >= this.from && date <= this.to;
    }
  };
}

// function to check if object is not empty
function isNotEmpty(object) {
  return Object.keys(object).length !== 0;
}

export {
  waitFor,
  getRandom,
  getIndex,
  getDaysInMilliseconds,
  formatToISODateString,
  getTimestampInSeconds,
  getDifferenceInSeconds,
  randomCase,
  getElementsFromArray,
  getRandomFromRange,
  ifArrHasDuplicates,
  createDateRange,
  isNotEmpty
};
