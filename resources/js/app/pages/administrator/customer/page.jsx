import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import CustomerSection from './sections/customer-section'
import store from '@/app/store/store';
import { get_customer_thunk } from '@/app/redux/customer-thunk';

export default function CustomerPage() {
  useEffect(() => {
    store.dispatch(get_customer_thunk())
  }, []);
  return (
    <AdminLayout>
      <CustomerSection/>
      </AdminLayout>
  )
}
