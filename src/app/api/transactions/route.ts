// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { updateTransaction, getTransactionsForToday, getTransactionsForThisMonth, getTransactionsForThisYear, getAllTransactionsBySpecificDate, getAllTransactions,  addTransaction } from '../../../utils/handler/functions';
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

    // use the query parameter to get the user's id, and the time parameter to get the time frame
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('_id');
    const time = searchParams.get('time');

    if (!_id) {
      return NextResponse.json(
        { error: '_id parameter is required' },
        { status: 400 }
      );
    }

    console.log('Request ID:', _id);

    let transactions;

    switch (time) {
      case 'today':
        transactions = await getTransactionsForToday(_id);
        break;
      case 'this_month':
        transactions = await getTransactionsForThisMonth(_id);
        break;
      case 'this_year':
        transactions = await getTransactionsForThisYear(_id);
        break;
      default:
        transactions = await getAllTransactions(_id);
    }

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

// put request to update a transaction
export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    console.log('Request Body:', body);

    const transaction = await updateTransaction(body._id, body);
    console.log('Transaction updated:', transaction);

    return NextResponse.json(transaction, {status: 200});
  } catch (error: any) {
    console.error('Error update transaction:', error);
    return NextResponse.json(
      { error: 'Failed to update transaction', details: error.message },
      { status: 500 }
    );
    }
}