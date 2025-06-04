const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('http://www.google.com');
    const data = await response.text();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send('Error fetching example.com: ' + error.message);
  }
};
