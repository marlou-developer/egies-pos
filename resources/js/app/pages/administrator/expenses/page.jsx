import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import ExpensesTableSection from './sections/expenses-table-section'
import store from '@/app/store/store';
import { get_expense_thunk } from '@/app/redux/expense-thunk';
import { get_expense_category_thunk } from '@/app/redux/expense-category-thunk';

export default function Page() {
    useEffect(() => {
        store.dispatch(get_expense_thunk())
        store.dispatch(get_expense_category_thunk())
    }, []);
    return (
        <AdminLayout>
            <ExpensesTableSection />
        </AdminLayout>
    )
}
