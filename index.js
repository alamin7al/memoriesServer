const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');


require('dotenv').config()
const ObjectId = require('mongodb').ObjectId;
const { query } = require('express');
const app = express();
const port = process.env.PORT || 5000;

const fileUpload = require('express-fileupload');
const req = require('express/lib/request');
const res = require('express/lib/response');

// middleware
app.use(cors());
app.use(express.json());
app.use(fileUpload())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ow5x2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri);

async function run() {
    try {
        await client.connect()
        const database = client.db('data')
        //assignment code
        const userDataCollection = database.collection('user')
        const blogDataCollection = database.collection('blog')
       








        app.post('/user', async (req, res) => {
            const user = req.body;
            // console.log('hit the post api', service); 

            const result = await userDataCollection.insertOne(user);
            res.send(result)
        });

        app.get('/user', async (req, res) => {
            const cursor = userDataCollection.find({})
            const user = await cursor.toArray()
            res.send(user)
        })







        app.get('/useremail', async (req, res) => {
            const email = req.query.email
            const query = { email: email }
            const cursor = userDataCollection.find(query)
            const user = await cursor.toArray()
            res.json(user)
        })
 
        app.get('/singleuser/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const user = await userDataCollection.findOne(query)
            res.send(user)
        })


        app.put('/singleuser/:id', async (req, res) => {
            const id = req.params.id
            const updateUser = req.body
            const filter = { _id: ObjectId(id) }
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
            const result = await userDataCollection.updateOne(filter, updateDoc, options)
            res.send(result)
        })



     
       
        app.post('/blogdata', async (req, res) => {
            const email = req.body.email;
            const image = req.body.image;
            const desc = req.body.desc;
            const heding = req.body.heding;
            const pic = req.files.image;
            const date = req.files.date;
            const picData = pic.data;
            const encodedPic = picData.toString('base64');
            const imageBuffer = Buffer.from(encodedPic, 'base64');
            const bloginformation = {
           image,desc,heding,date,email,
                image: imageBuffer
            }
            const result = await blogDataCollection.insertOne(bloginformation);
            res.json(result);
        })
        app.get('/blogdata', async (req, res) => {
            const cursor = blogDataCollection.find({})
            const user = await cursor.toArray()
            res.send(user)
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

// const usdCollection = database.collection('usd')
// const GBRCollection = database.collection('gbr')
// const EurCollection = database.collection('eur')
//assignment code


//assignment code
// app.get('/usd', async (req, res) => {
//     const cursor = usdCollection.find({})
//     const user = await cursor.toArray()
//     console.log(user);
//     res.send(user)
// })
// app.get('/gbr', async (req, res) => {
//     const cursor = GBRCollection.find({})
//     const user = await cursor.toArray()
//     console.log(user);
//     res.send(user)
// })
// app.get('/eur', async (req, res) => {
//     const cursor = EurCollection.find({})
//     const user = await cursor.toArray()
//     console.log(user);
//     res.send(user)
// })

// //assignment code
