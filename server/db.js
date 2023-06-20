
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
let db;

async function connect() {
  try {
    await client.connect();
    db = client.db('ippo-pay');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}


module.exports = { connect, db };



