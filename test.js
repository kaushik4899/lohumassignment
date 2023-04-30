const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/price', (req, res) => {
  axios.get('https://www.metal.com/Lithium-ion-Battery/202303240001')
    .then(response => {
      const $ = cheerio.load(response.data);

      // Scrape price information
      const price = $('.strong___1JlBD.priceDown___2TbRQ').text();

      res.json({ price });
    })
    .catch(error => {
      res.status(500).json({ error: 'Error scraping price information' });
    });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on port ${process.env.PORT || 3000}`);
});
