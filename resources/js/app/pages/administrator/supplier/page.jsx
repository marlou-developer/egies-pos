import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import SupplierSection from './sections/supplier-section'
import store from '@/app/store/store';
import { get_supplier_thunk } from '@/app/redux/supplier-thunk';

export default function SupplierPage() {
    useEffect(() => {
        store.dispatch(get_supplier_thunk())
    }, []);
    return (
        <AdminLayout>
            <SupplierSection />
        </AdminLayout>
    )
}
