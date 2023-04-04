import apiSlice from "../api/apiSlice";

export const assignmentMarkApi = apiSlice.injectEndpoints({
    tagTypes: ["AssignmentMark"],
    endpoints: builder => ({
        getAssignmentMarks: builder.query({
            query: () => "/assignmentMark",
        }),
        getAssignmentMarkByAssignmentAndStudent: builder.query({
            query: ({ studentId, assignmentId }) =>
                `/assignmentMark?student_id=${studentId}&assignment_id=${assignmentId}`,
            transformResponse: (response, _, { assignmentId }) => {
                if (!response) return null;
                if (!(response?.length !== 0)) return null;
                const assignmentMark = response?.find(a => a.assignment_id === assignmentId);
                if (!assignmentMark) return null;
                return assignmentMark;
            },
            providesTags: (result, error, { assignmentId }) => [
                { type: "AssignmentMark", id: assignmentId },
            ],
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
            invalidatesTags: (result, error, arg) => [
                { type: "AssignmentMark", id: result?.assignment_id },
            ],
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
            invalidatesTags: (result, error, arg) => [
                { type: "AssignmentMark", id: result?.assignment_id },
            ],
        }),
    }),
});

export const {
    useGetAssignmentMarksQuery,
    useEditAssignmentMarkMutation,
    useDeleteAssignmentMarkMutation,
    useAddAssignmentMarkMutation,
    useGetAssignmentMarkByAssignmentAndStudentQuery,
} = assignmentMarkApi;
