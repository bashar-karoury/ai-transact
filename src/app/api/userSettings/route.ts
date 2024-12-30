// `GET /userSettings`

// `PUT /userSettings`


// userSettings route

import dbConnect from '../../../utils/db';

import { NextRequest, NextResponse } from 'next/server';
import {getUserSettings} from '../../../utils/handler/functions';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams} = new URL(req.url);
        const _id = searchParams.get('_id');
        console.log('Request ID:', _id);

        if(!_id){
            return NextResponse.json(
                {error: '_id parameter is required'},
                {status: 400}
            );
        }

        const userSettings = await getUserSettings(_id);
        console.log('User Settings:', userSettings);

        return NextResponse.json(userSettings, {status: 200});
    }
    catch(error: any) {
        console.log('Error getting user settings:', error);
        return NextResponse.json(
            {error: 'Failed to get user settings', details: error.message},
            {status: 500}
        );
    }
}