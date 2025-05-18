import axios from "axios"

export function create_product_discount_service(data) {
    try {
        const result = axios.post('/api/product_discount', data)
        return result
    } catch (error) {

    }
}

export function get_product_discount_service() {
    try {
        const result = axios.get('/api/product_discount' + window.location.search)
        return result
    } catch (error) {

    }
}

// export async function get_category_by_id_service(id) {
//     const res = await axios.get('/api/category/' + id)
//     return res.data
// }

export function delete_product_discount_service(id) {
    try {
        const result = axios.delete(`/api/product_discount/${id}`)
        return result
    } catch (error) {

    }
}

export function update_product_discount_service(id,data) {
    try {
        const result = axios.post(`/api/update_product_discount`, data)
        return result
    } catch (error) {

    }
}