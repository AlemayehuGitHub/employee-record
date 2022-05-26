const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EmployeeSchema = new Schema({
    name: {
        type: String
    },
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    sallary: {
        type: String
    }
});

module.exports = mongoose.model('school_student', EmployeeSchema);
