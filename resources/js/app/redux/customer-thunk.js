import axios from "axios";
import { create_customer_service, delete_customer_service, get_customer_service, search_customer_service, update_customer_service } from "../pages/services/customer-service";
import { get_product_discount_by_id_service } from "../pages/services/product-discount-service";
import { customerSlice } from "./customer-slice";


export function create_customer_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_customer_service(data)

    };
}

export function search_customer_thunk(search) {
    return async function (dispatch, getState) {
        const res = await search_customer_service(search)
        return res;
    };
}
export function get_customer_thunk(params = {}) {
    return async function (dispatch) {
        try {
            const queryParams = new URLSearchParams(window.location.search);
            
            // Add pagination and search parameters
            if (params.page) queryParams.set('page', params.page);
            if (params.search) queryParams.set('search', params.search);
            if (params.per_page) queryParams.set('per_page', params.per_page);
            
            const queryString = queryParams.toString();
            const url = queryString ? `/api/customer?${queryString}` : '/api/customer';
            
            const res = await axios.get(url);
            console.log('resres', res.data)
            dispatch(customerSlice.actions.setCustomers(res.data));
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };
}



export function delete_customer_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_customer_service(id)
    };
}


export function update_customer_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_customer_service(data)
    };
}