import apiSlice from "../api/apiSlice";

const assignmentApi = apiSlice.injectEndpoints({
    tagTypes: ["Assignment"],
    endpoints: builder => ({
        getAssignments: builder.query({
            query: () => "/assignments",
        }),
        getAssignmentByVideo: builder.query({
            query: videoId => `/assignments?video_id=${videoId}`,
            transformResponse: response => {
                if (!response) return null;
                if (!(response?.length !== 0)) return null;
                return response[0];
            },
            providesTags: (result, error, video_id) => [{ type: "Assignment", id: video_id }],
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
            invalidatesTags: (result, error, arg) => [{ type: "Assignment", id: result?.video_id }],
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
            invalidatesTags: (result, error, arg) => [{ type: "Assignment", id: result?.video_id }],
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
            invalidatesTags: (result, error, id) => [{ type: "Assignment", id: result?.video_id }],
        }),
    }),
});

export const {
    useAddAssignmentMutation,
    useDeleteAssignmentMutation,
    useGetAssignmentsQuery,
    useEditAssignmentMutation,
    useGetAssignmentByVideoQuery,
} = assignmentApi;
