import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { address, message } = req.body;

    try {
      // Send request to Orange Pi
      const response = await axios.post('http://your-orange-pi-ip:5000/send', {
        address,
        message
      });

      // Store transaction in MongoDB
      const { MongoClient } = require('mongodb');
      const client = new MongoClient(process.env.MONGODB_URI);
      await client.connect();
      const db = client.db('iota_transactions');
      const collection = db.collection('transactions');
      await collection.insertOne({
        hash: response.data.hash,
        address,
        message,
        timestamp: new Date()
      });

      res.status(200).json(response.data);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while processing the transaction' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}