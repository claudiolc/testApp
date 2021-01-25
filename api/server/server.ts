import express = require('express');
import cors = require('cors');

const app: express.Application = express();
app.use(cors());

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

var query: any;
knex.select().from('patient').then((data:any) => {
    query = data;
}).catch((e:any) => {
    console.error(e);
});

app.get("/", function(req:any, res:any, next:any) {
    res.send(query);
});

app.listen(9000, function() {
    console.log('App listening on port 9000');
});