const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

// BookHeavendb
// jP0GY8kAvkwbmVpL
const uri = "mongodb+srv://BookHeavendb:jP0GY8kAvkwbmVpL@cluster0.vleqg85.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.get('/', (req, res) => {
    res.send('Simple CRUD server is running!');
})

app.listen(port, () => {
    console.log(`Simple crud server is running on port: ${port}`);
})

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  finally {

  }
}
run().catch(console.dir);