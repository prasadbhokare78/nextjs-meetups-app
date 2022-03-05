// /api/new-meetup
// POST /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //const { title, image, address, description } = data;

    // MongoDB connection code
    const client = await MongoClient.connect(
      "mongodb+srv://prasadbhokare:prasadbhokare123@cluster0.ztbfz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );

    // db method to connect to database
    const db = client.db();

    // Creating a collection for data
    const meetupsCollection = db.collection("meetup");

    // Inserting data into database using insertOne method
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close(result);

    res.status(201).json({ message: "Meetup Inserted" });
  }
}

export default handler;
