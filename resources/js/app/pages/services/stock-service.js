import axios from "axios"

export function create_stock_service(data) {
    try {
        const result = axios.post('/api/stock', data)
        return result
    } catch (error) {

    }
}

export function get_stock_by_products_id_service() {
    try {
        const result = axios.get('/api/get_stock_by_products_id/'+window.location.pathname.split('/')[3])
        return result
    } catch (error) {

    }
}

export function get_update_stock_service(data) {
    try {
        const result = axios.put('/api/stock/'+window.location.pathname.split('/')[3],data)
        return result
    } catch (error) {

    }
}