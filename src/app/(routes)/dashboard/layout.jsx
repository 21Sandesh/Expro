'use client';

import React, { useEffect, useState } from 'react';
import SideNav from './components/SideNav';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';

const DashboardLayout = ({ children }) => {
    const router = useRouter();

    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };

        fetchSession();
    }, [router]);

    useEffect(() => {
       session?.user?.email && checkUserBudgets();
    }, [session]);

    const checkUserBudgets = async () => {
    try {
      const response = await fetch(`/api/user/checkUserBudget?email=${session.user.email}`);
      if (!response.ok) {
        throw new Error('Failed to check budgets');
      }
      const result = await response.json();
      console.log(result);
      if (result.length === 0) {
        router.replace("/dashboard/budgets");
      }
    } catch (error) {
      console.error(error);
    }
  };

    return (
        <div>
            <div className="fixed md:w-64 hidden md:block">
                <SideNav />
            </div>
            <div className='md:ml-64'>
                {children}
            </div>
        </div>
    );
}

export default DashboardLayout;
