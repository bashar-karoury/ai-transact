import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../utils/dbConnect'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbConnect();

    res.status(200).json({ message: 'connected successful' });
  } catch (error) {
    res.status(500).json({ error: 'connection failed', details: error });
  }
};

export default handler;
