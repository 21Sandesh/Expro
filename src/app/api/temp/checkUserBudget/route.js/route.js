import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../../lib/auth';

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        
        const result = await db.budgets.findMany({
            where: {
                createdBy: session?.user?.email,
            },
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}