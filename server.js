const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = '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';

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a friendly Telugu recipe assistant.' },
        { role: 'user', content: message }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to get response from OpenAI' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
