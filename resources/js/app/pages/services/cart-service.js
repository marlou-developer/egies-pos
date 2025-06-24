import axios from "axios";


export function edit_payment_service(data) {
    try {
        const result = axios.post("/api/edit_payment", data);
        return result;
    } catch (error) {}
}


export function edit_quantity_service(data) {
    try {
        const result = axios.post("/api/edit_quantity", data);
        return result;
    } catch (error) {}
}


export function create_cart_service(data) {
    try {
        const result = axios.post("/api/cart", data);
        return result;
    } catch (error) {}
}


export function get_report_service() {
    try {
        const result = axios.get("/api/get_report"+window.location.search);
        return result;
    } catch (error) {}
}

export function get_over_due_service() {
    try {
        const result = axios.get("/api/get_over_due");
        return result;
    } catch (error) {}
}

export function update_all_status_service(data) {
    try {
        const result = axios.post("/api/update_all_status", data);
        
        return result;
    } catch (error) {}
}
export function update_status_service(data) {
    try {
        const result = axios.post("/api/update_status", data);
        
        return result;
    } catch (error) {}
}

export function add_payment_service(data) {
    try {
        const result = axios.post("/api/credit_payment", data);
        return result;
    } catch (error) {}
}

export function get_shopee_service() {
    try {
        const result = axios.get(
            "/api/get_shopee" + window.location.search
        );
        return result;
    } catch (error) {}
}
export function get_cart_credit_service() {
    try {
        const result = axios.get(
            "/api/get_cart_credit" + window.location.search
        );
        return result;
    } catch (error) {}
}

export function get_cart_service() {
    try {
        const result = axios.get("/api/cart" + window.location.search);
        return result;
    } catch (error) {}
}

export async function get_cart_by_id_service(id) {
    const res = await axios.get("/api/cart/" + id);
    return res;
}

export function delete_cart_service(id) {
    try {
        const result = axios.delete(`/api/cart/${id}`);
        return result;
    } catch (error) {}
}

export function update_cart_service(data) {
    try {
        const result = axios.put(`/api/cart/${data.id}`, data);
        return result;
    } catch (error) {}
}
