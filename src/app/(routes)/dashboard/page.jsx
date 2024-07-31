'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import CardInfo from './components/CardInfo';
import BarChartDashboard from './components/BarChart';
import ExpenseListTable from './expenses/components/ExpenseListTable';
import BudgetItem from './budgets/components/BudgetItem';

const Dashboard = () => {
    const [session, setSession] = useState(null);
    const router = useRouter();

    const [budgetList, setBudgetList] = useState([]);
    const [incomeList, setIncomeList] = useState([]);
    const [expensesList, setExpensesList] = useState([]);

    useEffect(() => {
      const fetchSession = async () => {
        try {
          const sessionData = await getSession();
          setSession(sessionData);
          if (!sessionData?.user?.email) {
            router.replace('/');
          }
        } catch (error) {
          console.error('Error fetching session:', error);
          setError('Failed to fetch session. Please try again later.');
          }
        };
        fetchSession();
    }, [router]);

    useEffect(() => {
      if (session) {
        getBudgetList();
        getIncomeList();
        getAllExpenses();
      }
    }, [session]);

    const getBudgetList = async () => {
    try {

      const response = await fetch(`/api/user/getBudgetList?email=${encodeURIComponent(session.user.email)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch budget list');
      }
      const result = await response.json();
      setBudgetList(result);
      getAllExpenses();
      getIncomeList();
    } catch (error) {
      console.error(error);
      // toast.error("Error fetching budget list: " + error.message);
    }
  };

    const getIncomeList = async () => {
    try {
      const response = await fetch(`/api/user/getIncomeList?email=${session.user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch income list');
      }
      const result = await response.json();
      setIncomeList(result.incomes);
    } catch (error) {
      console.error("Error fetching income list:", error);
      // toast.error("Error fetching income list: " + error.message);
    }
  };

    const getAllExpenses = async () => {
    try {
      const response = await fetch(`/api/user/getExpenseList?email=${session.user.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const result = await response.json();
      setExpensesList(result);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      // toast.error("Error fetching expenses: " + error.message);
    }
  };


    if (!session) {
        return <h2>Loading...</h2>;  // Loading state
    }

    return (
        <div className='p-8'>
            <h2 className='font-bold text-2xl'>Dashboard, Welcome {session.user?.username || 'User'}</h2>
            <p className='text-gray-500'>Hello,</p>

            <CardInfo budgetList={budgetList} incomeList={incomeList} />
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
                <div className="lg:col-span-2">
                    <BarChartDashboard budgetList={budgetList} />

                    <ExpenseListTable
                        expensesList={expensesList}
                        refreshData={() => getBudgetList()}
                    />
                </div>
                <div className="grid gap-5">
                    <h2 className="font-bold text-lg">Latest Budgets</h2>
                    {budgetList?.length > 0 ? budgetList.map((budget) => (
                        <BudgetItem budget={budget} key={budget.id} />
                    )) : (
                        [1, 2, 3, 4].map((item, index) => (
                            <div
                                className="h-[180px] w-full bg-slate-200 rounded-lg animate-pulse"
                                key={index}
                            ></div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
