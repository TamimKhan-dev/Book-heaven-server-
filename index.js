const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vleqg85.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

app.get("/", (req, res) => {
  res.send("Simple CRUD server is running!");
});

app.listen(port, () => {
  console.log(`Simple crud server is running on port: ${port}`);
});

async function run() {
  try {
    await client.connect();

    const bookdb = client.db("bookdb");
    const booksCollection = bookdb.collection("books");
    const usersCollection = bookdb.collection("users");

    app.post("/add-book", async (req, res) => {
      const newBook = req.body;
      const result = await booksCollection.insertOne(newBook);
      res.send(result);
    });

    app.get("/all-books", async (req, res) => {
      const books = await booksCollection.find().toArray();
      res.send(books);
    });

    app.get("/recent-books", async (req, res) => {
      const books = await booksCollection
        .find()
        .sort({ _id: -1 })
        .limit(6)
        .toArray();
      res.send(books);
    });

    app.get("/myBooks/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email };
      const userBooks = await booksCollection.find(query).toArray();
      res.send(userBooks);
    });

    app.put("/update-book/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBook = req.body;
      const filter = { _id: new ObjectId(id) };
      const newBook = {
        $set: {
          title: updatedBook.title,
          author: updatedBook.author,
          price: updatedBook.price,
          coverImage: updatedBook.coverImage,
          genre: updatedBook.genre,
          rating: updatedBook.rating,
        },
      };

      const result = await booksCollection.updateOne(filter, newBook);
      res.send(result);
    });

    app.delete("/delete-book/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await booksCollection.deleteOne(query);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
