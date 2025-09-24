import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import TableSection from './sections/table-section'
import store from '@/app/store/store'
import { get_sales_thunk } from '@/app/redux/cart-thunk'

export default function SalesPage() {

    useEffect(()=>{
        store.dispatch(get_sales_thunk())
    },[])
    return (
        <AdminLayout>
            <TableSection />
        </AdminLayout>
    )
}
