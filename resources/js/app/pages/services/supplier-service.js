import axios from "axios"

export function create_supplier_service(data) {
    try {
        const result = axios.post('/api/supplier', data)
        return result
    } catch (error) {

    }
}

export function get_supplier_service() {
    try {
        const result = axios.get('/api/supplier')
        return result
    } catch (error) {

    }
}
