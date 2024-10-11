import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Simulate sensor data
    const data = {
      temperature: Math.random() * 30 + 10, // Random temperature between 10 and 40
      humidity: Math.random() * 60 + 20, // Random humidity between 20 and 80
      timestamp: new Date().toISOString()
    };

    res.status(200).json(data);
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}