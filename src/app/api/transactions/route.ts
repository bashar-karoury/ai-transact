// import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserIdByEmail,
  deleteTransaction,
  updateTransaction,
  getTransactionsForToday,
  getTransactionsForThisMonth,
  getTransactionsForThisYear,
  getAllTransactions,
  addTransaction
} from '../../../utils/handler/functions';
import dbConnect from '../../../utils/db';
import { stackServerApp } from '@/stack';


export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    // Get the user from the request
    const user = await stackServerApp.getUser();

    if (!user) {
        return new NextResponse("Not authorized", { status: 401 });
    }
    // Get the user's email
    const user_email = user.primaryEmail;
    console.log('User email:', user_email);
    if (!user_email) {
      return new NextResponse("User email not found", { status: 400 });
    }
    // Get the user's id using the email
    const _id: string = await getUserIdByEmail(user_email);

    if (!_id) {
      return new NextResponse("User not found", { status: 404 });
    }

    console.log('Request ID:', _id);

    // Get the body of the request
    const body = await req.json();
    console.log('Request Body:', body);

    // Add the transaction
    const transaction = await addTransaction(_id, body);
    console.log('transaction added:', transaction);

    return NextResponse.json(transaction, { status: 201 });
  } catch (error: any) {
    // Return an error if the transaction could not be created
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

    // Get the user from the request
    const user = await stackServerApp.getUser();

    if (!user) {
        return new NextResponse("Not authorized", { status: 401 });
    }
    // Get the user's email
    const user_email = user.primaryEmail;
    console.log('User email:', user_email);
    if (!user_email) {
      return new NextResponse("User email not found", { status: 400 });
    }
    // Get the user's id using the email
    const _id: string = await getUserIdByEmail(user_email);

    // Get the 'time' parameter from the body
    const body = await req.json();
    const time = body.time;
    console.log('Request Body:', body);

    // use the query parameter to get the user's id, and the time parameter to get the time frame
    // const { searchParams } = new URL(req.url);
    // const _id = searchParams.get('_id');
    // const time = searchParams.get('time');

    if (!_id) {
      // Return an error if the user id is not provided
      return NextResponse.json(
        { error: '_id parameter is required' },
        { status: 400 }
      );
    }

    console.log('Request ID:', _id);

    let transactions;

    switch (time) {
      // get transactions for today
      case 'today':
        transactions = await getTransactionsForToday(_id);
        break;
      // get transactions for this month
      case 'this_month':
        transactions = await getTransactionsForThisMonth(_id);
        break;
      // get transactions for this year
      case 'this_year':
        transactions = await getTransactionsForThisYear(_id);
        break;
      // get all transactions
      default:
        transactions = await getAllTransactions(_id);
    }

    console.log('transactions:', transactions);

    return NextResponse.json(transactions, { status: 200 });
  } catch (error: any) {
    // Return an error if the transactions could not be fetched
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

    // Get the user from the request
    const user = await stackServerApp.getUser();

    if (!user) {
        return new NextResponse("Not authorized", { status: 401 });
    }
    // Get the user's email
    const user_email = user.primaryEmail;
    console.log('User email:', user_email);
    if (!user_email) {
      return new NextResponse("User email not found", { status: 400 });
    }
    // Get the user's id using the email
    const _id: string = await getUserIdByEmail(user_email);

    // Get the body of the request
    const body = await req.json();
    console.log('Request Body:', body);

    // Update the transaction
    const transaction = await updateTransaction(_id, body.transaction_id, body);
    console.log('Transaction updated:', transaction);

    return NextResponse.json(transaction, {status: 200});
  } catch (error: any) {
    // Return an error if the transaction could not be updated
    console.error('Error update transaction:', error);
    return NextResponse.json(
      { error: 'Failed to update transaction', details: error.message },
      { status: 500 }
    );
    }
}

// delete request to delete a transaction
export async function DELETE(req: NextRequest) {
  try {
    await dbConnect();

    // Get the user from the request
    const user = await stackServerApp.getUser();

    if (!user) {
      return new NextResponse("Not authorized", { status: 401 });
    }
    // Get the user's email
    const user_email = user.primaryEmail;
    console.log('User email:', user_email);
    if (!user_email) {
      return new NextResponse("User email not found", { status: 400 });
    }
    // Get the user's id using the email
    const _id: string = await getUserIdByEmail(user_email);

    // Get the body of the request
    const body = await req.json();
    console.log('Request Body:', body);

    // Delete the transaction
    const transaction = await deleteTransaction(_id, body.transaction_id);
    console.log('Transaction deleted:', transaction);

    // Return the deleted transaction
    return NextResponse.json(transaction, {status: 200});
  } catch (error: any) {
    // Return an error if the transaction could not be deleted
    console.error('Error delete transaction:', error);
    return NextResponse.json(
      { error: 'Failed to delete transaction', details: error.message},
      { status: 500}
    );
  }
}