"use client";
import React, { useEffect, useState } from 'react'
import ExpenseListTable from './components/ExpenseListTable';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

function ExpensesScreen() {

  const [expensesList,setExpensesList]=useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
        const sessionData = await getSession();
        setSession(sessionData);
      };
      fetchSession();
    }, [router]);

  const getAllExpenses = async () => {
    try {
      const response = await fetch(`/api/user/expense/get?email=${session.user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const result = await response.json();
      setExpensesList(result);
    } catch (error) {
      console.error(error);
      // toast.error("Error fetching expenses: " + error.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (session?.user?.email) {
      getAllExpenses();
    }
  }, [session?.user?.email]);

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>

        <ExpenseListTable refreshData={()=>getAllExpenses()}
        expensesList={expensesList}
        />
    </div>
  )
}

export default ExpensesScreen