const express = require('express');
const bodyParser = require('body-parser');
const MongoCliente = require('mongodb').MongoClient;
const uuidv1 = require('uuid/v1');
const ordersMock = require('./mockData/orders');
const driversMock = require('./mockData/drivers');


const uri = `mongodb+srv://felipe:F6oKPTeaEgkfc6RU@cluster0-jftyz.mongodb.net/test?retryWrites=true&w=majority`
const app = express();
let db = null;
app.use(bodyParser.json());

MongoCliente.connect(uri,  { useNewUrlParser: true },  (err, client) => {
    if (err) return console.log(err);
    db = client.db('orkestro')

    app.listen(4000, function () {
        console.log('server running felipe...')
    })
})

app.get('/orders/:orderId', (req, res) => {
    const id = req.params.orderId;
    db.collection('order').find({id}).toArray((err, results) => {
        if (err) return console.log(err)
        res.send(results)
    })
})

app.get('/orders', (req, res) => {
    db.collection('order').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.send(results)

    })
})

app.get('/ordersMock', (req, res) => {
    res.send(ordersMock)
})

app.get('/driversMock', (req, res) => {
    res.send(driversMock)
})

app.post('/order', (req, res) => {
    const body = req.body;
    if (!body) {
        res.send('')
        return;
    }
    const oder = {
        id: uuidv1(),
        status: 'PENDING',
        pickupTime: body.pickupTime,
        pickupAddress: body.pickupAddress,
        dropoffAddress: body.dropoffAddress,
        type: body.type,
        packageSize: body.packageSize,
    }
    db.collection('order').save(oder, (err, result) => {
        if (err) return console.log(err)

        console.log('order saved')
        res.send('')
    })
})






