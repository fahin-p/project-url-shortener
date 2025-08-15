const express = require('express');
const { nanoid } = require('nanoid');
const Url = require('./models/Url');

const router = express.Router();

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  if (!longUrl || !longUrl.startsWith('http')) {
    return res.status(400).json({ error: 'Invalid URL provided.' });
  }
  try {
    let url = await Url.findOne({ where: { longUrl } });
    if (url) {
      return res.status(200).json(url);
    }
    const shortCode = nanoid(7);
    url = await Url.create({ longUrl, shortCode });
    return res.status(201).json(url);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;