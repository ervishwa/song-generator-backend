const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 5050;

app.use(express.json());
app.use(cors());

app.post("/getlyrics", async (req, res) => {
  const {
    name,
    gender,
    petName,
    whatmakesAngry,
    funniestThing,
    whatMakeSmile,
    favouriteMovie,
    favouriteSport,
  } = req.body;

  let song = `In a world adorned with laughter and joy, there stands ${name}, a beacon of positivity and light. This ${gender} soul radiates warmth and kindness, making every interaction a delight. With a pet named ${petName}, a loyal companion with a heart so pure, ${name} embarks on adventures, and their bond is the ultimate cure.

  From the quirkiest pet antics to the most endearing smiles, ${name} finds joy in the simple pleasures that life compiles. A favorite movie, a cinematic escape, ignites the imagination and transports ${name} to a world where dreams take shape. When the day calls for action, the favorite sport comes alive, and ${name}'s spirit soars, the cheers reaching new heights.
  
  Yet, within the depths of ${name}'s soul, there lies a unique melody—what makes them laugh, what makes them frown. A tapestry of emotions, woven with care, ${name}'s essence is a song, a harmonious affair. So here's to ${name}, a symphony of one, whose story is sung beneath the radiant sun. With a heart full of love and moments so grand, ${name}, you're cherished across the land.`;

  try {
    let p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(song);
      }, 3000);
    });
    const data = await p1;
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
