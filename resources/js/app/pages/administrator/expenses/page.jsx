import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import ExpensesTableSection from './sections/expenses-table-section'
import store from '@/app/store/store';
import { get_expense_thunk } from '@/app/redux/expense-thunk';

export default function Page() {
    useEffect(() => {
        store.dispatch(get_expense_thunk())
    }, []);
    return (
        <AdminLayout>
            <ExpensesTableSection />
        </AdminLayout>
    )
}
