import React, { useEffect, useState } from 'react';
import AdminLayout from '../layout';
import ProductsSection from './sections/products-section';
import store from '@/app/store/store';
import { get_product_thunk } from '@/app/redux/product-thunk';
import { useDispatch } from 'react-redux';
import { get_category_thunk } from '@/app/redux/category-thunk';

export default function ProductsPage() {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        store.dispatch(get_product_thunk());
        store.dispatch(get_category_thunk())
    }, []);

    return (
        <AdminLayout>
            <ProductsSection
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </AdminLayout>
    );
}
