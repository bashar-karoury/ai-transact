// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { addTransaction } from '../../../utils/handler/functions';
import dbConnect from '../../../utils/db';


export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log('Request Body:', body);

    const transaction = await addTransaction(body._id, body);
    console.log('transaction added:', transaction);

    return NextResponse.json(transaction, { status: 201 });
  } catch (error: any) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to add transaction', details: error.message },
      { status: 500 }
    );
  }
}

// `GET /transactions?time=today|this_month|this_year`
