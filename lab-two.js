const monthNames = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
};

const monthCodes = {
    "January": 1,
    "February": 4,
    "March": 4,
    "April": 0,
    "May": 2,
    "June": 5,
    "July": 0,
    "August": 3,
    "September": 6,
    "October": 1,
    "November": 4,
    "December": 6
};

const codesOfTheDay = [
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
];

function makeCalender(year = 2021) { // year can be anything

    let firstDayOfYear = new Date(`January 1, ${year}`);
    let timestamp = firstDayOfYear.getTime();

    let totalDays = (isLeapYear(year)) ? 366 : 365;

    for (let i = 1; i <= totalDays; i++) {
        let date = new Date(timestamp);
        console.log(date.getMonth() + 1 + "-" + date.getDate() + "-" + year + " is a " + getDayOfTheWeek(year, monthNames[date.getMonth() + 1], date.getDate()));
        timestamp = timestamp + 86400000;
    }
}

function getDayOfTheWeek(year, month, day) {

    let lastTwoDigitsOfTheYear = String(year).substring(String(year).length - 2, String(year).length);

    // STEP 1: counting how many 12s is in the last digits of the year.
    let countTheTwelves = Math.floor(lastTwoDigitsOfTheYear / 12);

    // STEP 2: remainder of the last division.
    let remaindersOfDivisionOfTwelve = lastTwoDigitsOfTheYear % 12;

    // STEP 3: counting how many 4s is in the remainder of twelve
    let countTheFoursInRemainders = Math.floor(remaindersOfDivisionOfTwelve / 4);

    // STEP 5
    let codeOfTheMonth_orMore = monthCodes[month];

    // STEP 6 adding all of the above numbers: countTheTwelves + remaindersOfDivisionOfTwelve + countTheFoursInRemainders + day of the month + month code
    let sum = countTheTwelves + remaindersOfDivisionOfTwelve + countTheFoursInRemainders + day + codeOfTheMonth_orMore;

    sum = offsetCalculate(sum, year, month);

    let codeOfTheDay = sum % 7;

    return codesOfTheDay[codeOfTheDay];
}

/*
    Quote from wikipedia:
   * The following pseudocode determines whether a year is a leap year or a common year in the Gregorian calendar (and in the proleptic Gregorian calendar before 1582). The year variable being tested is the integer representing the number of the year in the Gregorian calendar.

   if (year is not divisible by 4) then (it is a common year)
   else if (year is not divisible by 100) then (it is a leap year)
   else if (year is not divisible by 400) then (it is a common year)
   else (it is a leap year)
   * https://en.wikipedia.org/wiki/Leap_year
   * */
function isLeapYear(year) {
    if (year % 4 !== 0) {
        return false;
    } else if (year % 100 !== 0) {
        return true;
    } else if (year % 400 !== 0) {
        return true;
    } else {
        return true;
    }
}

function offsetCalculate(offsetSum, year, month){

    let firstTwoDigitsOfTheYear = String(year).substring(0, 2);

    // January and February dates in leap years: subtract 1 from step 5
    if (isLeapYear(year) && (month === "January" || month === "February")) {
        offsetSum -= 1;
    }

    if (String(year).length === 4) {
        switch (firstTwoDigitsOfTheYear) {
            case "16":
                offsetSum += 6;
                break;
            case "17":
                offsetSum += 4;
                break;
            case "18":
                offsetSum += 2;
                break;
            case "20":
                offsetSum += 6;
                break;
            case "21":
                offsetSum += 4;
                break;
        }
    }
    return offsetSum;
}

module.exports = {
    monthNames,
    makeCalender,
    isLeapYear,
    getDayOfTheWeek
}