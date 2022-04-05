const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');


require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const { query } = require('express');
const app = express();
const port = process.env.PORT || 5000;



// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ow5x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
        await client.connect()
        const database = client.db('data')
        const dataCollection = database.collection('dataist')



        app.get('/userlist', async (req, res) => {
            const cursor = dataCollection.find({})
            const user = await cursor.toArray()
            res.send(user)
        })

        app.post('/userlist', async (req, res) => {
            const service = req.body;
            // console.log('hit the post api', service);

            const result = await dataCollection.insertOne(service);
            console.log(result);
            res.send(result)
        });


        app.put('/user/:id', async (req, res) => {
            const id = req.params.id
            console.log(id);
            const updateUser = req.body
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true }

            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    mulisectors: updateUser.mulisectors,


                }
            }
            const result = await dataCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })









        app.get('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const user = await dataCollection.findOne(query)
            res.send(user)
        })


        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id
            const quarry = { _id: ObjectId(id) }
            const deleteData = await dataCollection.deleteOne(quarry)
            res.send(deleteData)

        })




        console.log('j');
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('Running my CRUD Server');
});

app.listen(port, () => {
    console.log('Runningg Server on port', port);
})
//m3Ny8UQlkzF69teR//doctor