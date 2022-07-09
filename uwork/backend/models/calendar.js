let mongoose = require('mongoose');

let calendarSchema = mongoose.Schema({
    companyOwner : String,
    employeeOwner : String,
    type : String,
    date : Date,
    startTime: Date,
    endTime: Date,
});

let calendarModel = mongoose.model('calendar', calendarSchema);

module.exports = calendarModel;