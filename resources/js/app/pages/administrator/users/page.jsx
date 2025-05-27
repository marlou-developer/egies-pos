import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import UsersSection from './sections/users-section'
import store from '@/app/store/store';
import { get_users_thunk } from '@/app/redux/user-thunk';

export default function UserPage() {

  useEffect(() => {
    store.dispatch(get_users_thunk())
  }, []);
  return (
    <AdminLayout>
      <UsersSection />
    </AdminLayout>
  )
}
