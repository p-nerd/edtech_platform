import apiSlice from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        register: builder.mutation({
            query: data => ({
                url: "/register",
                method: "POST",
                body: data,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem("auth", JSON.stringify(result.data));
                    dispatch(userLoggedIn(result.data));
                } catch (e) {
                    console.log(e);
                }
            },
        }),
        login: builder.mutation({
            query: data => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                try {
                    const result = await queryFulfilled;
                    localStorage.setItem("auth", JSON.stringify(result.data));
                    dispatch(userLoggedIn(result.data));
                } catch (e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
