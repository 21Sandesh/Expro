import { db } from '../../../../lib/db';
import { NextResponse } from 'next/server';

export async function GET(req) {
    const { searchParams } = new URL(req.url, `http://${req.headers.host}`);
    const email = searchParams.get('email');

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        try {
            const incomes = await db.income.findMany({
                where: { createdBy: email },
                select: {
                    id: true,
                    name: true,
                    amount: true,
                },
            });

            const totalAmount = incomes.reduce((acc, income) => acc + parseFloat(income.amount || 0), 0);

            return NextResponse.json({ incomes, totalAmount });
        } catch (error) {
            console.error("Error fetching income list:", error);
            NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
        }
}

