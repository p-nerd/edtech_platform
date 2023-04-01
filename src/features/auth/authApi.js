import apiSlice from "../api/apiSlice";
import { setAuthError, userLoggedIn } from "./authSlice";

const addAuthToStateAndLocalStore = (dispatch, result) => {
    localStorage.setItem("auth", JSON.stringify(result.data));
    dispatch(userLoggedIn(result.data));
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: data => ({
                url: "/register",
                method: "POST",
                body: { ...data, role: "student" },
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const result = await queryFulfilled;
                addAuthToStateAndLocalStore(dispatch, result);
            },
        }),
        login: builder.mutation({
            query: data => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const result = await queryFulfilled;
                addAuthToStateAndLocalStore(dispatch, result);
            },
        }),
        adminLogin: builder.mutation({
            query: data => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const result = await queryFulfilled;
                if (result?.data?.user?.role !== "admin") {
                    dispatch(setAuthError("You are not admin"));
                    return;
                }
                addAuthToStateAndLocalStore(dispatch, result);
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useAdminLoginMutation } = authApi;
