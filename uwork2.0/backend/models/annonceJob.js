let mongoose = require('mongoose');

let imageSchema = mongoose.Schema({
    urlAddress: String,
});

let acceptedSchema = mongoose.Schema({
    employeeId: String,
})

let annonceJobSchema = mongoose.Schema({
    compagnyOwner: String,
    compagnyName: String,
    jobName: String,
    sector: String,
    description: String,
    image: [imageSchema],
    contract: String,
    contractTime: Number,
    address: String,
    zip: Number,
    city: String,
    regime: String,
    accepted: [acceptedSchema]
});

let annonceJobModel = mongoose.model('annonceJob', annonceJobSchema);

module.exports = annonceJobModel;