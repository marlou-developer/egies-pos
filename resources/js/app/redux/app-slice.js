import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        users: [],
        user: {},
        sidebarOpen: false,
        sidebarCollapsed: false,
        dashboard: {
            result: []
        },
    },
    reducers: {
        setDashboard: (state, action) => {
            state.dashboard = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        toggleSidebarCollapsed(state) {
            state.sidebarCollapsed = !state.sidebarCollapsed;
        },
        setSidebarCollapsed(state, action) {
            state.sidebarCollapsed = action.payload;
        },
    },
});
export const {
    setUser,
    setSidebarOpen,
    toggleSidebarCollapsed,
    setSidebarCollapsed,
    setDashboard,
} = appSlice.actions;

export default appSlice.reducer;
