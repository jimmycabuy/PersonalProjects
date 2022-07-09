let mongoose = require('mongoose');

let jobTypeSchema = mongoose.Schema({
    contract: String,
    sector: String,
    city: String,
    distance: Number,
    regime: String,
});

let educationSchema = mongoose.Schema({
    school: String,
    studyfield: String,
    degree: String,
    start: Date,
    end: Date,
    description: String,
});

let languageSchema = mongoose.Schema({
    name: String,
    level: String,
    description: String,
});

let oldAnnonceJobSchema = mongoose.Schema({
    id: String,
})

let usersSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    avatar: String,
    age: Number,
    city: String,
    bio: String,
    email: String,
    password: String,
    token: String,
    oldAnnonceJob: [oldAnnonceJobSchema],
    education: [educationSchema],
    language: [languageSchema],
    jobType: [jobTypeSchema]
});

let usersModel = mongoose.model('users', usersSchema);

module.exports = usersModel;