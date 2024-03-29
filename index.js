const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ahmedrafi364
// 2ZUqEh8MmOUEHBlN

console.log(process.env.DB_USER);



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.iahcoxz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const database = client.db('usersDB');
    const usersCollection = database.collection('users');

    app.post('/users', async(req, res)=> {
        const user = req.body;
        console.log('new user', user);
        const result = await usersCollection.insertOne(user);
    });



    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

}
        catch(error){
                console.error('Mongo error', error);
        }
}
run().catch(console.dir);


app.get('/', (req, res)=> {
        res.send('simmple crud');

})
app.listen(port, ()=> {
        console.log(`crud running on port ${port}`);
})
