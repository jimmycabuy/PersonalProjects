let mongoose = require('mongoose');

let annonceJob = mongoose.Schema({
    annonceId: String,
});

let oldUsersSchema = mongoose.Schema({
    id: String,
})

let compagnySchema = mongoose.Schema({
    logo: String,
    compagnyName: String,
    siteWeb: String,
    address: String,
    zip: Number,
    city: String,
    bio: String,
    email: String,
    password: String,
    token: String,
    annonceJob: [annonceJob],
    oldUsers: [oldUsersSchema],
});

let compagnyModel = mongoose.model('compagnies', compagnySchema);

module.exports = compagnyModel;