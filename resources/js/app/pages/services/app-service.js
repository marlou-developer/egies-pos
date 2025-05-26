import axios from "axios";

export function get_dashboard_service(search) {
    try {
        const result = axios.get("/api/dashboard?search=" + search);
        return result;
    } catch (error) {}
}
