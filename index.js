const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());



const uri = "mongodb+srv://collegeAdmission:7SfAK8CHsTqoyGmn@cluster0.8o8vfkj.mongodb.net/?retryWrites=true&w=majority";

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

    const collegeCollections = client.db('collegeAdmission').collection('allCollege');

    app.get('/allcollege', async (req, res) => {
        const cursor = collegeCollections.find();
        const result = await cursor.toArray();
        res.send(result);
      });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run();




app.get('/', (req, res) => {
    res.send('Server is Running.....')
  })
  
  app.listen(port, () => {
    console.log(`port is running on ${port}`)
  });

//   7SfAK8CHsTqoyGmn