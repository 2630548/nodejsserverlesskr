// api/fetch.js
export default async function handler(req, res) {
  try {
    const response = await fetch('https://www.google.com');
    const data = await response.text();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
