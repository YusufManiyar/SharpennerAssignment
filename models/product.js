const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id;
    this.userId = userId;
  }

  save(){
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update existing product
      dbOp = db.collection('products')
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      // Create new product
      dbOp = db.collection('products')
        .insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log('Product saved:', result);
        return result;
      })
      .catch(err => {
        console.error('Error saving product:', err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log('Products fetched:', products);
        return products;
      })
      .catch(err => {
        console.error('Error fetching products:', err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection('products')
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log('Product found:', product);
        return product;
      })
      .catch(err => {
        console.error('Error finding product:', err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db.collection('products')
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => {
        console.log('Product deleted:', result);
      })
      .catch(err => {
        console.error('Error deleting product:', err);
      });
  }
}

module.exports = Product;
