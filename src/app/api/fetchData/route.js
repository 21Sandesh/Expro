// src/app/api/fetchData/route.js
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { NextResponse } from 'next/server';
import { getBudgetList, getIncomeList, getAllExpenses } from './utils';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session || !session.user || !session.user.email) {
            return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
        }

        const email = session.user.email;
        const budgets = await getBudgetList(email);
        const incomes = await getIncomeList(email);
        const expenses = await getAllExpenses(email);

        return NextResponse.json({ budgets, incomes, expenses });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}