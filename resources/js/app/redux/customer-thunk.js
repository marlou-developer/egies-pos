import { create_customer_service, get_customer_service } from "../pages/services/customer-service";
import { customerSlice } from "./customer-slice";


export function create_customer_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_customer_service(data)

    };
}

export function get_customer_thunk() {
    return async function (dispatch) {
        try {
            const res = await get_customer_service();
            console.log('resres', res.data)
            dispatch(customerSlice.actions.setCustomers(res.data));
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };
}


// export function get_internet_plan_by_id_thunk(id) {
//     return async function (dispatch, getState) {
//         const res = await get_internet_plan_by_id_service(id)
//         dispatch(internetPlanSlice.actions.setInternetPlan(res.status));
//         return res.status
//     };
// }


export function delete_product_thunk(id) {
    return async function (dispatch, getState) {
        const res = await delete_product_service(id)
    };
}


export function update_product_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_product_service(data)
    };
}