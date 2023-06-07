// server/middleware/rss-proxy.js
const axios = require('axios');

export default async function (req, res) {
  const url = 'https://www.mos.ru/rss'; // URL of the RSS feed
  try {
    const response = await axios.get(url);
    res.setHeader('Access-Control-Allow-Origin', '*'); // Set the header to allow all domains to access the data
    res.end(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).end('Internal Server Error');
  }
}
