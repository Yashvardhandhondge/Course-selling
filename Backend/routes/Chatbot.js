const express = require('express');
const router = express.Router();
const axios = require('axios');
const {yash} = require('./gemini')



router.post('/', async (req, res) => {
  const { message} = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  try {
   
    const botResponse = await yash(message);
    res.status(200).json({ response: botResponse });
  } catch (error) {
    res.status(500).json({ error: 'Error getting response from OpenAI' });
  }
});

module.exports = {router};
