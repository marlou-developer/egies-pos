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
        reload:0,
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
        setReload(state, action) {
            state.reload = action.payload;
        }

    },
});
export const {
    setUser,
    setSidebarOpen,
    toggleSidebarCollapsed,
    setSidebarCollapsed,
    setDashboard,
    setCollapsed,
    setReload
} = appSlice.actions;

export default appSlice.reducer;
