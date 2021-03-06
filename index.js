/* Your Code Here */
let createEmployeeRecord = function(record){
    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployeeRecords = function(records){
    return records.map(record => createEmployeeRecord(record));
}

let createTimeInEvent = function(dateStamp){
    const dateTime = dateStamp.split(' ')
    let inEvent = {
      type: "TimeIn",
      hour: parseInt(dateTime[1]),
      date: dateTime[0],
    }
    this.timeInEvents.push(inEvent);
    return this
}

let createTimeOutEvent = function(dateStamp){
    const dateTime = dateStamp.split(' ');
    let outEvent = {
      type: "TimeOut",
      hour: parseInt(dateTime[1]),
      date: dateTime[0],
    }
    this.timeOutEvents.push(outEvent);
    return this
}

let hoursWorkedOnDate = function(date){
    let timeIn = this.timeInEvents.find(element => element.date === date).hour;
    let timeOut = this.timeOutEvents.find(element => element.date === date).hour;
    let hours = (timeOut - timeIn)/100;
    return hours
}

let wagesEarnedOnDate = function(date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

let findEmployeeByFirstName = function(records, firstName) {
    return records.find(record => record.firstName === firstName)
}

let calculatePayroll = function(records){
    return records.reduce((sum, record) => sum + allWagesFor.call(record), 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
