import apiSlice from "../api/apiSlice";

const assignmentApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAssignments: builder.query({
            query: () => "/assignments",
        }),
        deleteAssignment: builder.mutation({
            query: assignmentId => ({
                url: `/assignments/${assignmentId}`,
                method: "DELETE",
            }),
            onQueryStarted: async (assignmentId, { queryFulfilled, dispatch }) => {
                await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getAssignments", undefined, draft => {
                        return draft?.filter(d => d.id !== assignmentId);
                    })
                );
            },
        }),
        addAssignment: builder.mutation({
            query: data => ({
                url: "/assignments",
                method: "POST",
                body: data,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getAssignments", undefined, draft => {
                        draft?.push(data);
                    })
                );
            },
        }),
        editAssignment: builder.mutation({
            query: ({ data, id }) => ({
                url: `/assignments/${id}`,
                method: "PATCH",
                body: data,
            }),
            onQueryStarted: async ({ id }, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getAssignments", undefined, draft => {
                        return draft?.map(item => (item.id === id ? data : item));
                    })
                );
            },
        }),
    }),
});

export default assignmentApi;
export const {
    useAddAssignmentMutation,
    useDeleteAssignmentMutation,
    useGetAssignmentsQuery,
    useEditAssignmentMutation,
} = assignmentApi;
