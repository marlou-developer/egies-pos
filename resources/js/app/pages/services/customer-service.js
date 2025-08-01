import axios from "axios"

export function create_customer_service(data) {
    try {
        const result = axios.post('/api/customer', data)
        return result
    } catch (error) {

    }
}

export function search_customer_service(data) {
    try {
        const result = axios.get('/api/search_customer?search=' + data)
        return result
    } catch (error) {

    }
}

export function get_customer_service() {
    try {
        const result = axios.get('/api/customer' + window.location.search)
        return result
    } catch (error) {

    }
}

export function get_all_customer_service() {
    try {
        const result = axios.get('/api/get_customers' + window.location.search)
        return result
    } catch (error) {

    }
}


// export async function get_category_by_id_service(id) {
//     const res = await axios.get('/api/category/' + id)
//     return res.data
// }

export function delete_customer_service(id) {
    try {
        const result = axios.delete(`/api/customer/${id}`)
        return result
    } catch (error) {

    }
}

export function update_customer_service(data) {
    try {
        const result = axios.put(`/api/customer/${data.id}`, data)
        return result
    } catch (error) {

    }
}

