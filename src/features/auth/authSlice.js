import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    accessToken: "",
    user: null,
    error: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.error = "";
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: state => {
            localStorage.removeItem("auth");
            state.error = "";
            state.accessToken = "";
            state.user = {
                id: 0,
                email: "",
                name: "",
            };
        },
        setAuthError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export default authSlice;
export const { userLoggedIn, userLoggedOut, setAuthError } = authSlice.actions;
