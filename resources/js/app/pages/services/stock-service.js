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
        const result = axios.get('/api/get_stock_by_products_id/' + window.location.pathname.split('/')[3])
        return result
    } catch (error) {

    }
}

export function get_update_stock_service(data) {
    try {
        const result = axios.put('/api/stock/' + window.location.pathname.split('/')[3], data)
        return result
    } catch (error) {

    }
}

export function soft_delete_service(data) {
    try {
        const result = axios.post('/api/soft_delete/' + data.product_id, {
            products: { id: data.product_id },
            ...data
        })
        return result
    } catch (error) {
        console.error('Error in soft_delete_service:', error);
        throw error;
    }
}

export function restore_service(data) {
    try {
        const result = axios.post('/api/restore/' + data.product_id, {
            products: { id: data.product_id },
            ...data
        })
        return result
    } catch (error) {
        console.error('Error in restore_service:', error);
        throw error;
    }
}