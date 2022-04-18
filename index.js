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
        //assignment code
        const usdCollection = database.collection('usd')
        const GBRCollection = database.collection('gbr')
        const EurCollection = database.collection('eur')
        //assignment code
        const userDataCollection = database.collection('user')


        //assignment code
        app.get('/usd', async (req, res) => {
            const cursor = usdCollection.find({})
            const user = await cursor.toArray()
            console.log(user);
            res.send(user)
        })
        app.get('/gbr', async (req, res) => {
            const cursor = GBRCollection.find({})
            const user = await cursor.toArray()
            console.log(user);
            res.send(user)
        })
        app.get('/eur', async (req, res) => {
            const cursor = EurCollection.find({})
            const user = await cursor.toArray()
            console.log(user);
            res.send(user)
        })

        //assignment code









        app.post('/user', async (req, res) => {
            const user = req.body;
            // console.log('hit the post api', service); 

            const result = await userDataCollection.insertOne(user);
            res.send(result)
        });

        app.get('/useremail', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const cursor = userDataCollection.find(query)
            const user = await cursor.toArray()
            res.json(user)
        })

        app.put('/useremail', async (req, res) => {
            const updateUser = req.body

            const options = { upsert: true }

            const updateDoc = {
                $set: {
                    address: updateUser.address,
                    bio: updateUser.bio,
                    date: updateUser.date,
                    displayName: updateUser.displayName,
                    email: updateUser.email,
                    facebook: updateUser.facebook,
                    gender: updateUser.gender,
                    insta: updateUser.insta,
                    profession: updateUser.profession,
                    linke: updateUser.linke,
                    website: updateUser.website,

                }
            }
            const result = await userDataCollection.updateOne(updateDoc, options)
            console.log(result);
            res.send(result)
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