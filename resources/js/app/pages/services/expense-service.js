import axios from "axios"

export function create_expense_service(data) {
    try {
        const result = axios.post('/api/expense', data)
        return result
    } catch (error) {

    }
}

export function search_expense_service(data) {
    try {
        const result = axios.get('/api/search_expense?search=' + data)
        return result
    } catch (error) {

    }
}

export function get_expense_service() {
    try {
        const result = axios.get('/api/expense' + window.location.search)
        return result
    } catch (error) {

    }
}

// export async function get_category_by_id_service(id) {
//     const res = await axios.get('/api/category/' + id)
//     return res.data
// }

export function delete_expense_service(id) {
    try {
        const result = axios.delete(`/api/expense/${id}`)
        return result
    } catch (error) {

    }
}

export function update_expense_service(data) {
    try {
        const result = axios.put(`/api/expense/${data.id}`, data)
        return result
    } catch (error) {

    }
}

