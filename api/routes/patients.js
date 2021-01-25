var express = require("express");
var router = express.Router();

const knex = require('knex')({
    client: 'pg',
    version: '13.1',
    connection: {
        host : '127.0.0.1',
        user : 'claudio',
        password : 'pgpassword',
        database : 'testapp'
    }
});

var query;
knex.select().from('patient').then(data => {
    query = data;
}).catch(e => {
    console.error(e);
});

router.get("/", function(req, res, next) {
    res.send(query);
});

module.exports = router;