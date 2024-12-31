// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { getAllTransactionsBySpecificDate, getAllTransactions,  addTransaction } from '../../../utils/handler/functions';
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
export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    // use the query parameter to get the user's id
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('_id');
    const start_date_str = searchParams.get('start_date');
    const end_date_str = searchParams.get('end_date');
    const start_date = start_date_str ? new Date(start_date_str) : null;
    const end_date = end_date_str ? new Date(end_date_str) : null;

    if (!_id) {
      return NextResponse.json(
        { error: '_id parameter is required' },
        { status: 400 }
      );
    }

    console.log('Request ID:', _id);

    const transactions = await getAllTransactionsBySpecificDate(_id, start_date as Date, end_date as Date);
    console.log('transactions:', transactions);

    return NextResponse.json(transactions, { status: 200 });
} catch (error: any) {
    console.error('Error getting transactions:', error);
    return NextResponse.json(
      { error: 'Failed to get transactions', details: error.message },
      { status: 500 }
    );
  }
}