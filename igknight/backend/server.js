const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/generate', async (req, res) => {
  const { idea } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Here is a startup idea: ${idea}. Please provide two ways to improve or pivot this idea, numbered as 1 and 2.`,
          },
        ],
        max_tokens: 150,
        n: 1,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Parse the suggestions from the response
    const suggestionsText = response.data.choices[0].message.content.trim();
    const suggestions = suggestionsText
      .split(/\n+/)
      .filter((line) => line)
      .map((line) => line.replace(/^\d+\.\s*/, ''));

    res.json({ suggestions });
  } catch (error) {
    // **Error Handling Starts Here**
    console.error('Error with OpenAI API:', error.response ? error.response.data : error.message);

    // Send an error response to the frontend
    res.status(500).json({
      error: error.response && error.response.data
        ? error.response.data.error.message
        : 'An unexpected error occurred while processing your request.',
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
