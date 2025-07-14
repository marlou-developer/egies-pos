import React, { useEffect } from 'react'
import AdminLayout from '../../layout'
import SoftDeletedTablesSection from './sections/soft-deleted-tables-section'
import store from '@/app/store/store';
import { get_soft_deleted_product_thunk } from '@/app/redux/product-thunk';
import { get_supplier_thunk } from '@/app/redux/supplier-thunk';

export default function Page() {
    useEffect(() => {
        store.dispatch(get_soft_deleted_product_thunk())
        store.dispatch(get_supplier_thunk())
    }, []);
    return (
        <AdminLayout>
            <SoftDeletedTablesSection />
        </AdminLayout>
    )
}
