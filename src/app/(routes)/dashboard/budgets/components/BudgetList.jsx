"use client"
import React, { useEffect, useState } from 'react';
import CreateBudget from './CreateBudget';
import BudgetItem from './BudgetItem';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function BudgetList() {

  const [budgetList,setBudgetList]=useState([]);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };

        fetchSession();
    }, [router]);

  const getBudgetList = async () => {
    try {
      const response = await fetch(`/api/user/budget/getBudgetList?email=${session?.user?.email}`);
      if (!response.ok) {
        throw new Error('Failed to fetch budget list');
      }
      const result = await response.json();
      setBudgetList(result);
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (session?.user?.email) {
      getBudgetList();
    }
  }, [session?.user?.email]);

  return (
    <div className='mt-7'>
        <div className='grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5'>
        <CreateBudget
        refreshData={()=>getBudgetList()}/>
        {budgetList?.length>0? budgetList.map((budget,index)=>(
          <BudgetItem budget={budget} key={index} />
        ))
      :[1,2,3,4,5].map((item,index)=>(
        <div key={index} className='w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse'>

        </div>
      ))
      }
        </div>
    </div>
  )
}

export default BudgetList