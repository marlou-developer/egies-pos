import axios from "axios"

export function create_category_service(data) {
    try {
        const result = axios.post('/api/category', data)
        return result
    } catch (error) {

    }
}