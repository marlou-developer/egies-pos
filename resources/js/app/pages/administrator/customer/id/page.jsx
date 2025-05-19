import React, { useEffect } from 'react'
import CustomerProductDiscountSection from './sections/customer-product-discount-section'
import AdminLayout from '../../layout'
import store from '@/app/store/store'
import { get_product_discount_by_id_thunk, get_product_thunk } from '@/app/redux/product-thunk'

export default function Page() {
    const customer_id = window.location.pathname.split('/')[3]

    useEffect(()=>{
        store.dispatch(get_product_thunk())
        store.dispatch(get_product_discount_by_id_thunk(customer_id))
    },[])
    return (
        <AdminLayout>
            <CustomerProductDiscountSection />
        </AdminLayout>
    )
}
