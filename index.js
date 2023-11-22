const express = require('express');
const OpenAI = require('openai');

const app = express();
const PORT = 5000;

app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/generate-chat-completion', async (req, res) => {
  try {
    const { userMessage } = req.body;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: userMessage }],
      model: 'gpt-3.5-turbo',
    });

    const generatedText = chatCompletion.data.choices[0]?.message?.content || 'No response from OpenAI';

    res.json({ generatedText });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
