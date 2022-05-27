const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
    name: {
        type: String
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    sallary: {
        type: Number
    }
});

module.exports = mongoose.model('school_student', EmployeeSchema);
