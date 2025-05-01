import { create_product_service } from "../pages/services/product-service";


export function create_product_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_product_service(data)

    };
}

// export function get_internet_plan_thunk() {
//     return async function (dispatch, getState) {
//         const res = await get_internet_plan_service()
//         dispatch(internetPlanSlice.actions.setInternetPlans(res.data.result));
//     };
// }

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