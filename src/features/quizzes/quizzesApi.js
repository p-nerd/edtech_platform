import apiSlice from "../api/apiSlice";

export const quizzesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getQuizzes: builder.query({
            query: () => "/quizzes",
        }),
        getQuizzesByVideo: builder.query({
            query: videoId => `/quizzes?video_id=${videoId}`,
            transformResponse: response => {
                if (!response) return null;
                if (!(response?.length !== 0)) return null;
                return response;
            },
        }),
        deleteQuiz: builder.mutation({
            query: quizId => ({
                url: `/quizzes/${quizId}`,
                method: "DELETE",
            }),
            onQueryStarted: async (quizId, { queryFulfilled, dispatch }) => {
                await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getQuizzes", undefined, draft => {
                        return draft?.filter(d => d.id !== quizId);
                    })
                );
            },
        }),
        addQuiz: builder.mutation({
            query: data => ({
                url: "/quizzes",
                method: "POST",
                body: data,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getQuizzes", undefined, draft => {
                        draft?.push(data);
                    })
                );
            },
        }),
        editQuiz: builder.mutation({
            query: ({ data, id }) => ({
                url: `/quizzes/${id}`,
                method: "PATCH",
                body: data,
            }),
            onQueryStarted: async ({ id }, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getQuizzes", undefined, draft => {
                        return draft?.map(item => (item.id === id ? data : item));
                    })
                );
            },
        }),
    }),
});

export const {
    useGetQuizzesQuery,
    useGetQuizzesByVideoQuery,
    useAddQuizMutation,
    useDeleteQuizMutation,
    useEditQuizMutation,
} = quizzesApi;
