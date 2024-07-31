import { db } from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        try {
            const expenses = await db.expense.findMany({
                where: {
                    budget: {
                        createdBy: email,
                    },
                },
                orderBy: {
                    id: 'desc',
                },
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    createdAt: true,
                },
            });

            return NextResponse.json(expenses);
        } catch (error) {
            console.error("Error fetching expenses:", error);
            NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
}