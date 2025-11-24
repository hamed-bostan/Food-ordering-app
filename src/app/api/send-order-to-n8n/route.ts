import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const payload = req.body; // Forward the order data from client

  try {
    await axios.post('https://n8n.nearfood.ir:5678/webhook/nearfood', payload, {
      auth: {
        username: process.env.N8N_BASIC_AUTH_USER || 'admin',
        password: process.env.N8N_BASIC_AUTH_PASSWORD || 'supersecret',
      },
    });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending to n8n:', error);
    return res.status(500).json({ error: 'Failed to send to n8n' });
  }
}