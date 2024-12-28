import type { NextApiRequest, NextApiResponse } from 'next';
import { addUser } from '../../../utils/handler/functions';
import dbConnect from '../../../utils/db';
import { error } from 'console';
// import User  from '../../../utils/databaseModules/users';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect(); // Connect to database
    try {
      const { user } = req.body;
      const result = await addUser(user);
      console.log(result);
      // res.status(201).json(result);
    } catch (error) {
      // res.status(500).json({ error: 'Failed to add user' });
      throw new Error('Failed to add user');
    }

    return new Response("success", { status: 200 });
}


