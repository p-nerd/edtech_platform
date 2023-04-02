import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videoEditId: 0,
    assignmentEditId: 0,
    quizEditId: 0,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        setVideoEditId: (state, action) => {
            state.videoEditId = action.payload;
        },
        setAssignmentEditId: (state, action) => {
            state.assignmentEditId = action.payload;
        },
        setQuizEditId: (state, action) => {
            state.quizEditId = action.payload;
        },
    },
});

export default modalSlice;
export const { setVideoEditId, setAssignmentEditId, setQuizEditId } = modalSlice.actions;
