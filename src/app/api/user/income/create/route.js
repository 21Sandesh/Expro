import { db } from '../../../../../lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, amount, createdBy, icon } = body;

        if (!name || !amount || !createdBy) {
            return NextResponse.json({ error: 'Name, amount, and createdBy are required' }, { status: 400 });
        }

        const newIncome = await db.income.create({
            data: {
                name,
                amount,
                createdBy,
                icon,
            },
        });

        return NextResponse.json(newIncome);
    } catch (error) {
        console.error(error);
        NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
