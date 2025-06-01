import { create_supplier_service, get_supplier_service } from "../pages/services/supplier-service";
import { supplierSlice } from "./supplier-slice";

export function create_supplier_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_supplier_service(data)

    };
}

export function get_supplier_thunk() {
    return async function (dispatch, getState) {
        const res = await get_supplier_service()
        dispatch(supplierSlice.actions.setSuppliers(res.data.result));
    };
}


// export function delete_category_thunk(id) {
//     return async function (dispatch, getState) {
//         const res = await delete_category_service(id)
//     };
// }


// export function update_category_thunk(data) {
//     return async function (dispatch, getState) {
//         const res = await update_category_service(data)
//     };
// }