import React, { useEffect } from 'react'
import StocksSection from './sections/stocks-section'
import AdminLayout from '../layout'
import store from '@/app/store/store';
import { get_product_thunk } from '@/app/redux/product-thunk';
import { get_supplier_thunk } from '@/app/redux/supplier-thunk';

export default function Page() {
    useEffect(() => {
        store.dispatch(get_product_thunk())
        store.dispatch(get_supplier_thunk())
    }, []);
    return (
        <AdminLayout>
            <StocksSection />
        </AdminLayout>
    )
}
