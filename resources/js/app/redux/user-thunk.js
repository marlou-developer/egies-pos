import { create_user_service } from "../pages/services/user-service";

export function create_user_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_user_service(data)

    };
}