const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://new-user:lwYSJtZ7piE61B72@cluster0-y8hdl.mongodb.net/quick-alert", {
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