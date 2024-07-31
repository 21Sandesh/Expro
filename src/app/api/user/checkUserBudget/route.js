import { db } from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    try {
        const budgets = await db.budget.findMany({
            where: {
                createdBy: email,
            },
        });

        return NextResponse.json(budgets);
    } catch (error) {
        console.error(error);
        NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}