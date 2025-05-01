import axios from "axios"

export function create_category_service(data) {
    try {
        const result = axios.post('/api/category', data)
        return result
    } catch (error) {

    }
}

export function get_category_service() {
    try {
        const result = axios.get('/api/category')
        return result
    } catch (error) {

    }
}

// export async function get_category_by_id_service(id) {
//     const res = await axios.get('/api/category/' + id)
//     return res.data
// }

export function delete_category_service(id) {
    try {
        const result = axios.delete(`/api/category/${id}`)
        return result
    } catch (error) {

    }
}

export function update_category_service(data) {
    try {
        const result = axios.put(`/api/category/${data.id}`, data)
        return result
    } catch (error) {

    }
}