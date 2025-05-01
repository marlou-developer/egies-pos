import axios from "axios"

export function create_product_service(data) {
    try {
        const result = axios.post('/api/product', data)
        return result
    } catch (error) {

    }
}