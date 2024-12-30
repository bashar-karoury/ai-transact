import { NextRequest, NextResponse } from 'next/server';
import { getBalance } from '../../../utils/handler/functions';
import dbConnect from '../../../utils/db';

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Get the '_id' parameter from the query string
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('_id');

    // Log the '_id'
    console.log('Request ID:', _id);

    // Validate if '_id' exists
    if (!_id) {
      return NextResponse.json(
        { error: '_id parameter is required' },
        { status: 400 }
      );
    }

    // Fetch balance using '_id'
    const balance = await getBalance(_id);
    console.log('Balance is:', balance);

    // Return the balance
    return NextResponse.json(balance, { status: 200 });
  } catch (error: any) {
    console.error('Error getting balance:', error);
    return NextResponse.json(
      { error: 'Failed to get balance', details: error.message },
      { status: 500 }
    );
  }
}
