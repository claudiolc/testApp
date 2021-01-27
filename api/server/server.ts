import express = require('express');
import cors = require('cors');

const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

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

app.get("/index", function(req:any, res:any, next:any) {
    knex.select().from('patient').then((data:any) => {
        res.send(data);
    }).catch((e:any) => {
        console.error(e);
    });
});

app.post("/update", (req:any, res:any, next:any) => {
    let patient = req.body
    console.log('UPDATE\n', patient)

    knex('patient')
        .where({ id: patient.id })
        .update(patient, [], [])
    .catch((e:any) => {
        console.error(e);
    });
});

app.post("/create", (req:any, res:any, next:any) => {
    let patient = req.body
    console.log('INSERTION\n', patient)

    knex('patient')
        .insert(patient)
    .catch((e:any) => {
        console.error(e);
    });
});

app.post("/delete", (req:any, res:any, next:any) => {
    let patient = req.body
    console.log('DELETITION\n', patient)

    knex('patient')
        .where('id', patient.id)
        .del()
    .catch((e:any) => {
        console.error(e);
    });
});

app.listen(9000, function() {
    console.log('App listening on port 9000');
});