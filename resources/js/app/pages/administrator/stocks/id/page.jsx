import React, { useEffect } from 'react'
import AdminLayout from '../../layout'
import TableSection from './sections/table-section'
import store from '@/app/store/store'
import { get_stock_by_products_id_thunk } from '@/app/redux/stock-thunk'

export default function Page() {
  useEffect(()=>{
    store.dispatch(get_stock_by_products_id_thunk())
  },[])
  return (
    <AdminLayout>
        <TableSection />
    </AdminLayout>
  )
}
