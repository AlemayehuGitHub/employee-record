const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 4000;

const router = express.Router();

let Employee = require('./employee.model');

app.use(cors());
app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/employee', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

router.get('/employees', (req, res) => {
    console.log("Fetch all results request received");
    Employee.find((err, results) => {
        if (err) console.log(err);
        else res.json(results);
        console.log(results)
    });
});

router.get('/employee/:id', (req, res) => {
    console.log("Get a row request received");
    let id = req.params.id;
    Employee.findById(id, (err, result) => {
        if (err) console.log(err);
        else res.json(result);
        console.log(result);
    });
});

router.post('/employee', (req, res) => {
    console.log("Add New request received");
    let list = new Employee(req.body);
    list.save().then(list => {
        res.status(200).json({'list': 'Employee added successfully'});
    }).catch(err => {
        res.status(400).send('Adding failed');
    });
});

router.put('/employee/:id', (req, res) => {
    console.log("Update entry request received");
    console.log(req.body);
    Employee.findById(req.params.id, (err, data) => {
        if (!data) res.status(404).send("Employee is not found");
        else {
            data.name = req.body.name;
            data.gender = req.body.gender;
            data.dob = req.body.dob;
            data.sallary = req.body.sallary;
            
            data.save().then(data => {
                res.json('Employee Data is updated!');
            }).catch(err => {
                res.status(400).send("Update isn't possible");
            });
        }
    });
});

router.delete('/employee/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) return res.status(500).send("There was a problem deleting the employee.");
        res.status(200).send(`Employee was deleted successfully`);
    })
})

router.delete('/employees', (req, res) => {
    Employee.remove((err, data) => {
        if (err) return res.status(500).send("There was a problem deleting employees.");
        res.status(200).send(`All entry deleted`);
    })
})

app.use('/api', router);


app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
})
