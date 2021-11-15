const express = require('express')
const ObjectId = require('mongodb').ObjectId;
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
    const usersCollection = database.collection('users');
    const reviewsCollection = database.collection('reviews');
    const customersCollection = database.collection('customers')
    const ordersCollection = database.collection('orders')


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
      const query = {_id:ObjectId(id) };
      const bike = await bikesCollection.findOne(query);
      res.json(bike);
  })
  app.post('/bikes', async (req, res) => {
    const bike = req.body;
    const result = await bikesCollection.insertOne(bike);
    console.log(result);
    res.json(result);
  });
app.delete('bikes/:id', async (req, res)=>{
const id = req.params.id;
const query ={_id:ObjectId(id)}
const result = await bikesCollection.deleteOne(query);
res.json(result)
})
app.get('/orders', async (req, res) => {
  const cursor = ordersCollection.find({});
  const orders = await cursor.toArray();
  res.send(orders);
});
app.post('/orders', async (req, res) => {
  const order = req.body;
  const result = await ordersCollection.insertOne(order);
  console.log(result);
  res.json(result);
});
app.get('/customers', async (req, res) => {
  const cursor = customersCollection.find({});
  const customers = await cursor.toArray();
  res.send(customers);
});

app.post('/customers', async (req, res) => {
  const customer = req.body;
  const result = await customersCollection.insertOne(customer);
  console.log(result);
  res.json(result);
});
  app.get('/users/:email', async (req, res) => {
    const email = req.params.email;
    const query = { email: email };
    const user = await usersCollection.findOne(query);
    let isAdmin = false;
    if (user?.role === 'admin') {
        isAdmin = true;
    }
    res.json({ admin: isAdmin });
})

app.get('/users', async (req, res) => {
  const cursor = usersCollection.find({});
  const users = await cursor.toArray();
  res.send(users);
});

app.post('/users', async (req, res) => {
    const user = req.body;
    const result = await usersCollection.insertOne(user);
    console.log(result);
    res.json(result);
});

app.put('/users', async (req, res) => {
    const user = req.body;
    const filter = { email: user.email };
    const options = { upsert: true };
    const updateDoc = { $set: user };
    const result = await usersCollection.updateOne(filter, updateDoc, options);
    res.json(result);
});

  app.put('/users/admin', async (req, res) => {
    const user = req.body;
    const filter = { email: user.email };
    const updateDoc = { $set: {role: 'admin'} };
    const result = await usersCollection.updateOne(filter, updateDoc);
    res.json(result);
});
app.get('/reviews', async (req, res) => {
  const cursor = reviewsCollection.find({});
  const reviews = await cursor.toArray();
  res.send(reviews);
});
app.post('/reviews', async (req, res) => {
  const user = req.body;
  const result = await reviewsCollection.insertOne(user);
  console.log(result);
  res.json(result);
});

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