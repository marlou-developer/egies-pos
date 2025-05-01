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

// export async function get_internet_plan_by_id_service(id) {
//     const res = await axios.get('/api/internet_plan/' + id)
//     return res.data
// }

// export function delete_internet_plan_service(id) {
//     try {
//         const result = axios.delete(`/api/internet_plan/${id}`)
//         return result
//     } catch (error) {

//     }
// }

// export function update_internet_plan_service(data) {
//     try {
//         const result = axios.put(`/api/internet_plan/${data.id}`, data)
//         return result
//     } catch (error) {

//     }
// }