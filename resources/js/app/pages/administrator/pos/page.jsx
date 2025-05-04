import React, { useEffect } from 'react'
import PosSection from './sections/pos-section'
import AdminLayout from '../layout'
import store from '@/app/store/store'
import { get_category_thunk } from '@/app/redux/category-thunk'

export default function PosPage() {

    useEffect(()=>{
        store.dispatch(get_category_thunk())
    },[])
    return (
        <AdminLayout>
            <PosSection />
        </AdminLayout>
    )
}
