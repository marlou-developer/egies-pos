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

export function update_supplier_service(data) {
    try {
        const result = axios.put(`/api/supplier/${data.id}`, data)
        return result
    } catch (error) {

    }
}

export function delete_supplier_service(id) {
    try {
        const result = axios.delete(`/api/supplier/${id}`)
        return result
    } catch (error) {

    }
}
