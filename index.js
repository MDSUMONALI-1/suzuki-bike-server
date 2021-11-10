const express = require('express')
const { MongoClient } = require("mongodb");
const app = express()
const port =process.env.PORT||5000
const cors = require('cors');

app.use(cors());
app.use(express.json());
const uri =
  "mongodb+srv://aliceng:CPYGPkH0idj7KPLX@cluster0.aq2lr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)
async function run() {
  try {
    await client.connect();
    const database = client.db('store');
    const bikesCollection = database.collection('bikes');
    console.log("database connected")
    // Query for a movie that has the title 'Back to the Future'
    app.get('/bikes', async (req, res) => {
      const cursor = bikesCollection.find({});
      const bikes = await cursor.toArray();
      res.send(bikes);
  });

  // GET Single bike
  app.get('/bikes/:id', async (req, res) => {
      const id = req.params.id;
      console.log('getting specific bike', id);
      const query = { _id: ObjectId(id) };
      const bike = await bikesCollection.findOne(query);
      res.json(bike);
  })
 
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello assainment World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})