import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: "",
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: state => {
            localStorage.removeItem("auth");
            state.accessToken = "";
            state.user = {
                id: 0,
                email: "",
                name: "",
            };
        },
    },
});

export default authSlice;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
