import axios from "axios"

export function create_stock_service(data) {
    try {
        const result = axios.post('/api/stock', data)
        return result
    } catch (error) {

    }
}