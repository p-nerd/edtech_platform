import apiSlice from "../api/apiSlice";

const quizMarkApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        tagTypes: ["quizMarkItem"],
        getQuizMarks: builder.query({
            query: () => "/quizMark",
        }),
        addQuizMark: builder.mutation({
            query: data => ({
                url: "/quizMark",
                method: "POST",
                body: data,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "quizMarkItem", id: result.video_id, sid: result.student_id },
            ],
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getQuizMarks", undefined, draft => {
                        draft?.push(data);
                    })
                );
            },
        }),
        getQuizMarkByVideoAndStudent: builder.query({
            query: ({ videoId, studentId }) =>
                `/quizMark?student_id=${studentId}&video_id=${videoId}`,
            transformResponse: (response, _, arg) => {
                if (!response) return null;
                if (!(response?.length !== 0)) return null;
                return response[0];
            },
            providesTags: (result, error, { videoId, studentId }) => [
                { type: "quizMarkItem", id: videoId, sid: studentId },
            ],
        }),
    }),
});

export const {
    useAddQuizMarkMutation,
    useGetQuizMarkByVideoAndStudentQuery,
    useGetQuizMarksQuery,
} = quizMarkApi;
