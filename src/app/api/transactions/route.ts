import type { NextApiRequest, NextApiResponse } from 'next';
import { addTransaction } from '../../../utils/handler/functions';
import dbConnect from '../../../utils/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { userId, transaction } = req.body;
      const result = await addTransaction(userId, transaction);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add transaction' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
