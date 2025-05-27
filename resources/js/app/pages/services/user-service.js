import axios from "axios"

export function create_user_service(data) {
    try {
        const result = axios.post('/api/account', data)
        return result
    } catch (error) {

    }
}