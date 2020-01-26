const mongoose = require('mongoose');

mongoose.connect(process.env.Mongodb_URL, {
    useNewUrlParser: true,
})

const user = mongoose.model('users', {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    age: { type: Number },
    medicalConditions: { type: String },
    otherDetails: { type: String }
})

const service = mongoose.model('services', {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    type: { type: String},
    address: { type: String },
    latitude: { type: Number },
    longitude: { type: Number }
})

const alert = mongoose.model('alerts', {
    name: { type: String },
    time: { type: String },
    currentLocation: { type: String },
    serviceName: { type: String },
    phoneNumber: { type: String },
    age: { type: Number },
    medicalConditions: { type: String },
    otherDetails: { type: String },
    responded: false
})

module.exports = {
    User: user,
    Service: service,
    Alert: alert,
}