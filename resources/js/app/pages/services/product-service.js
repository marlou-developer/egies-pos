import axios from "axios"

export function create_product_service(data) {
    try {
        const result = axios.post('/api/product', data)
        return result
    } catch (error) {

    }
}

export function get_product_service() {
    try {
        const result = axios.get('/api/product' + window.location.search)
        return result
    } catch (error) {

    }
}

export function get_soft_deleted_product_service(params = {}) {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `/api/product_soft_deleted${queryParams ? `?${queryParams}` : ''}`;
        const result = axios.get(url);
        return result;
    } catch (error) {
        throw error;
    }
}

// export async function get_category_by_id_service(id) {
//     const res = await axios.get('/api/category/' + id)
//     return res.data
// }

export function delete_product_service(id) {
    try {
        const result = axios.delete(`/api/product/${id}`)
        return result
    } catch (error) {

    }
}

export function update_product_service(id,data) {
    try {
        const result = axios.post(`/api/update_product`, data)
        return result
    } catch (error) {

    }
}