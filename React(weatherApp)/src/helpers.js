/**
|--------------------------------------------------
| array helpers
|--------------------------------------------------
*/

export function occurence(array) {
  return array.sort((a,b) =>
        array.filter(elem => elem.weather[0].icon === a.weather[0].icon).length
      - array.filter(elem => elem.weather[0].icon === b.weather[0].icon).length
  ).pop();
}

export function contains(target, pattern) {
  let value = 0;
  pattern.forEach(function(word){
    value = value + target.includes(word);
  });
  return (value === 1)
}

export let dayNumber = new Date().getDay();
export const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
|--------------------------------------------------
| Helper functions for d3 library
|--------------------------------------------------
*/

export function numTicksForHeight(height) {
  if (height <= 300) return 3;
  if (300 < height && height <= 600) return 5;
  return 10;
}
export function numTicksForWidth(width) {
  if (width <= 300) return 2;
  if (300 < width && width <= 400) return 5;
  return 10;
}
export const width = 1000;
export const height = 500;
export const margin = {
  top: 60,
  bottom: 60,
  left: 80,
  right: 80
};
export const xMax = width - margin.left - margin.right;
export const yMax = height - margin.top - margin.bottom;

/**
|--------------------------------------------------
| Fetch error helper
|--------------------------------------------------
*/

export const handleResponse = (responseObj) => {
  return responseObj.json()
    .then(json => {
      return responseObj.ok ? json : Promise.reject(json);
    });
};

/**
|--------------------------------------------------
| temperature converter functions
|--------------------------------------------------
*/

export function cToF(celsius) {
  return celsius * 9 / 5 + 32;
}

export function fToC(fahrenheit) {
  return ((fahrenheit - 32) * 5 / 9);
}

/**
|--------------------------------------------------
| Capitalize first letter
|--------------------------------------------------
*/

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}