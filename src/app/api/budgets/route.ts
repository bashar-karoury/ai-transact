// `GET /budgets/`

// `POST /budgets/`
// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { addBudget } from '../../../utils/handler/functions';
import dbConnect from '../../../utils/db';


export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log('Request Body:', body);

    const budget = await addBudget(body._id, body);
    console.log('transaction added:', budget);

    return NextResponse.json(budget, { status: 201 });
  } catch (error: any) {
    console.error('Error creating budget:', error);
    return NextResponse.json(
      { error: 'Failed to add budget', details: error.message },
      { status: 500 }
    );
  }
}
