import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import ProductsSection from './sections/products-section'
import store from '@/app/store/store';
import { get_product_thunk } from '@/app/redux/product-thunk';

export default function ProductsPage() {
    useEffect(() => {
        store.dispatch(get_product_thunk())
    }, []);
    return (
        <AdminLayout>
            <ProductsSection />
        </AdminLayout>
    )
}
