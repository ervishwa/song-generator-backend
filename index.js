const express = require("express");
const OpenAI = require("openai");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = 5050;

app.use(express.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/generate-song-lyrics", async (req, res) => {
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

  let prompt = `
Wish a happy birthday to ${name}.

His/Her/Their pet name is ${petName}.

${whatmakesAngry} makes him/her/them angry.

${funniestThing} makes him/her/them funniest.

${whatMakeSmile} makes him/her/them special.

${favouriteMovie} movie He/she/they likes/like the most.

${favouriteSport} sports He/she/they likes/like the most.

Ensure that "Happy birthday" is mentioned at least twice in the lyrics, and it should rhyme. The lyrics should use simple, short, and easy to pronounce words as much as possible.

Using the above information about ${name}, please write 16 lines of happy lyrics that I can dedicate to him/her/them for his/her/their birthday. Each line can have maximum of 8 words or 40 characters.

The lyrics generated should be completely unique and never written before every single time and should not in any way or manner infringe on any trademarks/copyrights or any other rights of any individual or entity anywhere in the world. Any references or similarity to existing lyrics of any song anywhere in the world needs to be completely avoided. Any mention of proper nouns i.e. names or places of any manner apart from the ones mentioned above needs to be completely avoided. The lyrics generated should not be insensitive or should not offend any person/ place/ caste/ religion/ creed/ tribe/ country/ gender/ government/ organisation or any entity or individual in any manner whatsoever. Any words which might be construed directly or indirectly as cuss words or are offensive in any language should also be completely avoided.`;
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const generatedText =
      chatCompletion.data.choices[0]?.message?.content ||
      "No response from OpenAI";

    res.json({ generatedText });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
