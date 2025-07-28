const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const MONGODB_URI = 'mongodb+srv://GenerateImageData:GenerateImageData@cluster0.2qhjuyk.mongodb.net/sharpenertask?retryWrites=true&w=majority&appName=Cluster0';

const mongoConnect = callback => {
  return MongoClient.connect(MONGODB_URI)
    .then(client => {
      console.log('Connected to MongoDB');
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
    });
}

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error('No database found!');
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;