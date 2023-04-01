import apiSlice from "../api/apiSlice";

export const videosApi = apiSlice.injectEndpoints({
    tagTypes: ["Videos"],
    endpoints: builder => ({
        getVideos: builder.query({
            query: () => "/videos",
        }),
        deleteVideo: builder.mutation({
            query: videoId => ({
                url: `/videos/${videoId}`,
                method: "DELETE",
            }),
            onQueryStarted: async (videoId, { queryFulfilled, dispatch }) => {
                await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getVideos", undefined, draft => {
                        return draft?.filter(d => d.id !== videoId);
                    })
                );
            },
        }),
        addVideo: builder.mutation({
            query: data => ({
                url: "/videos",
                method: "POST",
                body: data,
            }),
            onQueryStarted: async (_, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getVideos", undefined, draft => {
                        draft?.push(data);
                    })
                );
            },
        }),
        editVideo: builder.mutation({
            query: ({ data, id }) => ({
                url: `/videos/${id}`,
                method: "PATCH",
                body: data,
            }),
            onQueryStarted: async ({ id }, { queryFulfilled, dispatch }) => {
                const { data } = await queryFulfilled;
                dispatch(
                    apiSlice.util.updateQueryData("getVideos", undefined, draft => {
                        return draft?.map(item => (item.id === id ? data : item));
                    })
                );
            },
        }),
    }),
});

export const {
    useAddVideoMutation,
    useGetVideosQuery,
    useDeleteVideoMutation,
    useEditVideoMutation,
} = videosApi;
