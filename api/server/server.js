"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var app = express();
app.use(cors());
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
var query;
knex.select().from('patient').then(function (data) {
    query = data;
}).catch(function (e) {
    console.error(e);
});
app.get("/", function (req, res, next) {
    res.send(query);
});
app.listen(9000, function () {
    console.log('App listening on port 9000');
});
