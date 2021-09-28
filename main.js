const readlineSync = require('readline-sync');
const labTwo = require('./lab-two');

console.log("Welcome to my own version of getDate() !! \n You can enter a date (MMM DD, YYYY) and receive the week day value of it.");

let input = readlineSync.question("Enter the date: ");

let date = new Date(input.toString());

if (isNaN(date.getMonth())){
    console.error("Error: Invalid Date Format. (Try something like: July 23, 2008 OR 07-23-2008 OR ...)");
    return;
}

let year = date.getFullYear();
let month = date.getMonth();
let day = date.getDate();

console.log("The answer is: " + labTwo.getDayOfTheWeek(year, labTwo.monthNames[month + 1], day));
