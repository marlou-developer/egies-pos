import React, { useEffect, useState } from "react";
import AdminLayout from "../layout";
import ProductsSection from "./sections/products-section";
import store from "@/app/store/store";
import { get_product_thunk } from "@/app/redux/product-thunk";
import { useDispatch } from "react-redux";
import { get_category_thunk } from "@/app/redux/category-thunk";
import { get_supplier_thunk } from "@/app/redux/supplier-thunk";

export default function ProductsPage() {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function get_data(params) {
            await store.dispatch(get_product_thunk());
            await store.dispatch(get_category_thunk());
            await store.dispatch(get_supplier_thunk());
            setLoading(false);
        }
        get_data();
    }, []);

    return (
        <AdminLayout>
            <div className="w-full flex items-center justify-center">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                        <span className="ml-2 text-gray-600">
                            Loading products...
                        </span>
                    </div>
                ) : (
                    <ProductsSection
                        current={current}
                        setCurrent={setCurrent}
                        pageSize={pageSize}
                        setPageSize={setPageSize}
                    />
                )}
            </div>
        </AdminLayout>
    );
}
