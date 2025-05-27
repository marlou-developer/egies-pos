import axios from "axios"

export function create_user_service(data) {
    try {
        const result = axios.post('/api/account', data)
        return result
    } catch (error) {

    }
}

export function get_users_service() {
    try {
        const result = axios.get('/api/account')
        return result
    } catch (error) {

    }
}

export async function get_user_login_service() {
    try {
        const res = await axios.get("/api/user");
        return res.data;
    } catch (error) {
        return error;
    }
}

export function update_user_service(data) {
    try {
        const result = axios.put(`/api/account/${data.id}`, data)
        return result
    } catch (error) {

    }
}

export function delete_user_service(id) {
    try {
        const result = axios.delete(`/api/account/${id}`)
        return result
    } catch (error) {

    }
}