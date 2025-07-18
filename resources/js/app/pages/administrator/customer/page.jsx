import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import CustomerSection from './sections/customer-section'
import store from '@/app/store/store';
import { get_customer_thunk } from '@/app/redux/customer-thunk';

export default function CustomerPage() {
  useEffect(() => {
    // Get URL parameters for pagination and search
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 1;
    const search = urlParams.get('search') || '';
    const per_page = urlParams.get('per_page') || 10;
    
    // Dispatch with parameters
    store.dispatch(get_customer_thunk({ page, search, per_page }));
  }, []);

  // Listen for URL changes (for pagination)
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const page = urlParams.get('page') || 1;
      const search = urlParams.get('search') || '';
      const per_page = urlParams.get('per_page') || 10;
      
      store.dispatch(get_customer_thunk({ page, search, per_page }));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <AdminLayout>
      <CustomerSection/>
    </AdminLayout>
  )
}
