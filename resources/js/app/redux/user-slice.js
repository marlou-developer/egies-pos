import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        user: {},
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setuser: (state, action) => {
            state.user = action.payload;
        },
    },
});
export const { setUsers, setuser } = userSlice.actions;

export default userSlice.reducer;
