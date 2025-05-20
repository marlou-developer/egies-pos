import axios from "axios"

export function create_cart_service(data) {
    try {
        const result = axios.post('/api/cart', data)
        return result
    } catch (error) {

    }
}


export function get_cart_credit_service() {
    try {
        const result = axios.get('/api/get_cart_credit')
        return result
    } catch (error) {

    }
}


export function get_cart_service() {
    try {
        const result = axios.get('/api/cart')
        return result
    } catch (error) {

    }
}

export async function get_cart_by_id_service(id) {
    const res = await axios.get('/api/cart/' + id)
    return res
}

export function delete_cart_service(id) {
    try {
        const result = axios.delete(`/api/cart/${id}`)
        return result
    } catch (error) {

    }
}

export function update_cart_service(data) {
    try {
        const result = axios.put(`/api/cart/${data.id}`, data)
        return result
    } catch (error) {

    }
}