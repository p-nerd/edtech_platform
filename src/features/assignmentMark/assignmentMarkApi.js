import apiSlice from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAssignmentMarks: builder.query({
            query: () => "/assignmentMark",
        }),
        deleteAssignmentMark: builder.mutation({
            query: assignmentMarkId => ({
                url: `/assignmentMark/${assignmentMarkId}`,
                method: "DELETE",
            }),
            onQueryStarted: async (assignmentMarkId, { queryFulfilled, dispatch }) => {
                await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getAssignmentMarks", undefined, draft => {
                        return draft?.filter(d => d.id !== assignmentMarkId);
                    })
                );
            },
        }),
        addAssignmentMark: builder.mutation({
            query: data => ({
                url: "/assignmentMark",
                method: "POST",
                body: data,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getAssignmentMarks", undefined, draft => {
                        draft?.push(data);
                    })
                );
            },
        }),
        editAssignmentMark: builder.mutation({
            query: ({ data, id }) => ({
                url: `/assignmentMark/${id}`,
                method: "PATCH",
                body: data,
            }),
            onQueryStarted: async ({ id }, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getAssignmentMarks", undefined, draft => {
                        return draft?.map(item => (item.id === id ? data : item));
                    })
                );
            },
        }),
    }),
});

export const {
    useGetAssignmentMarksQuery,
    useEditAssignmentMarkMutation,
    useDeleteAssignmentMarkMutation,
    useAddAssignmentMarkMutation,
} = assignmentMarkApi;
