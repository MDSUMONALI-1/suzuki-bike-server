const express = require('express')
const { MongoClient } = require("mongodb");
const app = express()
const port = 5000

const uri =
  "mongodb+srv://aliceng:CPYGPkH0idj7KPLX@cluster0.aq2lr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log(uri)
async function run() {
  try {
    await client.connect();
    const database = client.db('store');
    const bikes = database.collection('bikes');
    console.log("database connected")
    // Query for a movie that has the title 'Back to the Future'
   
 
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