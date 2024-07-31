import { db } from '../../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const budgetId = searchParams.get('budgetId');

        if (!budgetId) {
            return NextResponse.json({ error: 'Budget ID is required' }, { status: 400 });
        }

        try {
            const expenses = await db.expense.findMany({
                where: { budgetId: Number(budgetId) },
                orderBy: { id: 'desc' },
            });

            return NextResponse.json( expenses , { status: 200 });
        } catch (error) {
            console.error(error);
            NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
}

