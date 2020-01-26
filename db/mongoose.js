const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://new-user:gN5HQ3tA1sqBCFRE@cluster0-y8hdl.mongodb.net/quick-alert", {
    useNewUrlParser: true,
})

const newAlert = (name, user, time, address) => {
    const alertInfo = {
        firstName: { type: String },
        lastName: { type: String },
        date: { type: String },
        currentLocation: { type: String },
        phoneNumber: { type: Number },
        age: { type: Number },
        conditions: { type: String },
        otherDetails: { type: String },
    }

    const alert = mongoose.model(name, alertInfo);
    const newAlert = new alert({...user, date: time, currentLocation: address});
    return newAlert;
}

const user = mongoose.model('users', {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    phoneNumber: { type: String },
    age: { type: Number },
    conditions: { type: String },
    otherDetails: { type: String }
})

const service = mongoose.model('services', {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    type: { type: String},
    address: { type: String },
    // latitude: { type: Number },
    // longitude: { type: Number }
})

module.exports = {
    User: user,
    Service: service,
    NewAlert: newAlert,
}