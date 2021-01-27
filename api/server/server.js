"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
var knex = require('knex')({
    client: 'pg',
    version: '13.1',
    connection: {
        host: '127.0.0.1',
        user: 'claudio',
        password: 'pgpassword',
        database: 'testapp'
    }
});
app.get("/index", function (req, res, next) {
    knex.select().from('patient').then(function (data) {
        res.send(data);
    }).catch(function (e) {
        console.error(e);
    });
});
app.post("/update", function (req, res, next) {
    var patient = req.body;
    console.log('UPDATE\n', patient);
    knex('patient')
        .where({ id: patient.id })
        .update(patient, [], [])
        .catch(function (e) {
        console.error(e);
    });
});
app.post("/create", function (req, res, next) {
    var patient = req.body;
    console.log('INSERTION\n', patient);
    knex('patient')
        .insert(patient)
        .catch(function (e) {
        console.error(e);
    });
});
app.post("/delete", function (req, res, next) {
    var patient = req.body;
    console.log('DELETITION\n', patient);
    knex('patient')
        .where('id', patient.id)
        .del()
        .catch(function (e) {
        console.error(e);
    });
});
app.listen(9000, function () {
    console.log('App listening on port 9000');
});
