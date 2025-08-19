import axios from "axios"

export function create_expense_category_service(data) {
    try {
        const result = axios.post('/api/expense_category', data)
        return result
    } catch (error) {

    }
}

export function get_expense_category_service() {
    try {
        const result = axios.get('/api/expense_category')
        return result
    } catch (error) {

    }
}

// export async function get_expense_category_by_id_service(id) {
//     const res = await axios.get('/api/expense_category/' + id)
//     return res.data
// }

export function delete_expense_category_service(id) {
    try {
        const result = axios.delete(`/api/expense_category/${id}`)
        return result
    } catch (error) {

    }
}

export function update_expense_category_service(data) {
    try {
        const result = axios.put(`/api/expense_category/${data.id}`, data)
        return result
    } catch (error) {

    }
}