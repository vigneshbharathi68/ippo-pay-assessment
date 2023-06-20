const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const port = 3000;
var cors = require('cors')
app.use(cors())
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://mongo:1234@cluster0.hd3ez.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/list-all', async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const database = client.db('ippo-pay');
    const collection = database.collection('password_strength');

    const objects = await collection.find().toArray();
    res.status(201).json(objects);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    client.close();
    console.log('Disconnected from MongoDB');
    res.status(500).json({ message: 'Internal server error' });
  }
})
app.post('/register', async (req, res) => {
  try {
    await client.connect();
    let db = client.db('ippo-pay');
    console.log('Connected to MongoDB');
    const { password, strength } = req.query;
    const userId = uuidv4();
  
    // Insert the user data into the "users" collection
    await db.collection('password_strength').insertOne({ userId, password, strength, creationDate: new Date() });
  
    res.status(201).json({ message: 'Password registered successfully' });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
  });
  

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
