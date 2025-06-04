import { create_product_discount_service, delete_product_discount_service, get_product_discount_by_id_service, update_product_discount_service } from "../pages/services/product-discount-service";
import { create_product_service, delete_product_service, get_product_service, update_product_service } from "../pages/services/product-service";
import { customerSlice } from "./customer-slice";
import { productSlice } from "./product-slice";


export function create_product_discount_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_product_discount_service(data)
    };
}


export function create_product_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_product_service(data)

    };
}
export function get_product_thunk() {
    return async function (dispatch) {
        try {
            const res = await get_product_service();
            console.log('resres', res.data)
            dispatch(productSlice.actions.setProducts(res.data));
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
}

export function get_product_discount_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_product_discount_by_id_service(id)
        dispatch(customerSlice.actions.setCustomer(res));
        return res.data
    };
}



export function delete_product_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_product_service(id)
    };
}


export function update_product_thunk(id, data) {
    return async function (dispatch, getState) {
        const res = await update_product_service(id, data)
    };
}

export function update_product_discount_thunk(id, data) {
    return async function (dispatch, getState) {
        const res = await update_product_discount_service(id, data)
    };
}

export function delete_product_discount_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_product_discount_service(id)
    };
}