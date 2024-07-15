/* Your Code Here */
// index.js

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(arr => createEmployeeRecord(arr));
}

function createTimeInEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    });

    return this;
}

function createTimeOutEvent(dateTime) {
    let [date, hour] = dateTime.split(' ');

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    });

    return this;
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event.date === date);
    let timeOut = this.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
}

function allWagesFor() {
    let dates = this.timeInEvents.map(event => event.date);

    return dates.reduce((total, date) => total + wagesEarnedOnDate.call(this, date), 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor.call(employee), 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    findEmployeeByFirstName,
    calculatePayroll
};


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

