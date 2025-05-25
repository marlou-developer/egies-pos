import React, { useEffect } from 'react'
import StocksSection from './sections/stocks-section'
import AdminLayout from '../layout'
import store from '@/app/store/store';
import { get_product_thunk } from '@/app/redux/product-thunk';

export default function Page() {
    useEffect(() => {
        store.dispatch(get_product_thunk())
    }, []);
    return (
        <AdminLayout>
            <StocksSection />
        </AdminLayout>
    )
}
