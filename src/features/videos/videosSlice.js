import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeVideo: {},
};

const videosSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        setActiveVideo: (state, action) => {
            state.activeVideo = action.payload;
        },
    },
});

export default videosSlice;
export const { setActiveVideo } = videosSlice.actions;
