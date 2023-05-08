// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  let { db } = await connectToDatabase();

  try {
    if (req.method === "POST") {
      await db.collection("energy").insertMany(req.body);
      return res.json({
        message: "Post added successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }

  if (req.method === "GET") {
    try {
      let posts = await db.collection("energy").find({}).toArray();

      res.status(200).json({ db_post: posts });
    } catch (error) {
      return res.json({
        message: new Error(error).message,
        success: false,
      });
    }
  }
}
