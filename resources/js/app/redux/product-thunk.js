import { create_product_service, get_product_service } from "../pages/services/product-service";
import { productSlice } from "./product-slice";


export function create_product_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_product_service(data)

    };
}

export function get_product_thunk() {
    return async function (dispatch) {
        try {
            const res = await get_product_service();
            console.log('resres',res.data)
            dispatch(productSlice.actions.setProducts(res.data));
        } catch (error) {
            console.error("Error fetching products:", error);
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


// export function delete_internet_plan_thunk(id) {
//     return async function (dispatch, getState) {
//         const res = await delete_internet_plan_service(id)
//     };
// }


// export function update_internet_plan_thunk(data) {
//     return async function (dispatch, getState) {
//         const res = await update_internet_plan_service(data)
//     };
// }