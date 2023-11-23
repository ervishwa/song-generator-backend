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

  let song = `In the vibrant tapestry of life, there's a star shining bright named ${name}, whose gender doesn't confine the warmth they ignite. Happy Birthday, dear ${name}, let the celebrations begin, with ${petName} by your side, every moment will be a win.

  From ${whatmakesAngry} to the ${funniestThing}, emotions dance like the wind. Life's journey, unique and wild, a story of ${name}, forever compiled.
  
  A ${favouriteMovie}, a cinematic delight, where dreams take flight and laughter ignites. In this realm of joy, ${name} finds their way, making every scene a cherished play.
  
  And when the day calls for ${favouriteSport}, ${name}'s favorite pastime leads the way. Victories and defeats, all embraced with glee, in the field of joy, where ${name} is free.
  
  Happy Birthday, dear ${name}, a symphony of emotions, a canvas so grand. ${petName} and you, side by side, with what makes you smile, let the celebrations ride. 🎉`;

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
