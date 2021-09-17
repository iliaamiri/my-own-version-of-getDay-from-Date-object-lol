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

let monthCodes = {
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

const codesOfTheDay = {
    0: "Saturday",
    1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday"
};

function makeCalender() {

    let firstDayOf2021 = new Date("January 1, 2021");
    let timestamp = firstDayOf2021.getTime();

    for (let i = 1; i <= 365; i++) {
        let date = new Date(timestamp);
        console.log(date.getMonth() + 1 + "-" + date.getDate() + "-" + "2021" + " is a " + getDayOfTheWeek(2021, monthNames[date.getMonth() + 1], date.getDate()));
        timestamp = timestamp + 86400000;
    }
}

function getDayOfTheWeek(year, month, day) {

    // determining if the year is a leap year or not. (Based on wikipedia).
    let isYearLeap = isLeapYear(year);

    let lastTwoDigitsOfTheYear = String(year).substring(String(year).length - 2, String(year).length);

    let firstTwoDigitsOfTheYear = String(year).substring(0, 2);

    // STEP 1: counting how many 12s is in the last digits of the year.
    let countTheTwelves = Math.trunc(lastTwoDigitsOfTheYear / 12);

    // STEP 2: remainder of the last division.
    let remaindersOfDivisionOfTwelve = lastTwoDigitsOfTheYear % 12;

    // STEP 3: counting how many 4s is in the remainder of twelve
    let countTheFoursInRemainders = Math.trunc(remaindersOfDivisionOfTwelve / 4);

    // STEP 5
    let codeOfTheMonth_orMore = monthCodes[month];
    /*
        Dates in the 1600s: add 6 to step 5
        Dates in the 1700s: add 4 to step 5
        Dates in the 1800s: add 2 to step 5
        Dates in the 2000s: add 6 to step 5
        Dates in the 2100s: add 4 to step 5
     */
    if (String(year).length === 4) {
        switch (firstTwoDigitsOfTheYear) {
            case "16":
                codeOfTheMonth_orMore += 6;
                break;
            case "17":
                codeOfTheMonth_orMore += 4;
                break;
            case "18":
                codeOfTheMonth_orMore += 2;
                break;
            case "20":
                codeOfTheMonth_orMore += 6;
                break;
            case "21":
                codeOfTheMonth_orMore += 4;
                break;
        }
    }

    // January and February dates in leap years: subtract 1 from step 5
    if (isYearLeap && (month === "January" || month === "February")) {

        codeOfTheMonth_orMore -= 1;
    }

    // STEP 6 adding all of the above numbers: countTheTwelves + remaindersOfDivisionOfTwelve + countTheFoursInRemainders + day of the month + month code
    let sum = countTheTwelves + remaindersOfDivisionOfTwelve + countTheFoursInRemainders + day + codeOfTheMonth_orMore;
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

exports.monthNames = monthNames;
exports.makeCalender = makeCalender;
exports.isLeapYear = isLeapYear;
exports.getDayOfTheWeek = getDayOfTheWeek;