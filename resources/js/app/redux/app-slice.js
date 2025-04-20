import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        user: {},
        sidebarOpen: false,
        sidebarCollapsed: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
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
export const { setUser, setSidebarOpen, toggleSidebarCollapsed, setSidebarCollapsed, } =
    appSlice.actions;

export default appSlice.reducer;
