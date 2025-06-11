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
        collapsed:false,
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
        setCollapsed(state, action) {
            state.collapsed = action.payload;
        },
        
    },
});
export const {
    setUser,
    setSidebarOpen,
    toggleSidebarCollapsed,
    setSidebarCollapsed,
    setDashboard,
    setCollapsed
} = appSlice.actions;

export default appSlice.reducer;
