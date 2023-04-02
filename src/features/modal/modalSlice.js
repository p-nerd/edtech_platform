import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videoEditOpen: false,
    videoEditId: 0,
    assignmentEditOpen: false,
    assignmentEditId: 0,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        toggleVideoEditOpen: state => {
            state.videoEditOpen = !state.videoEditOpen;
        },
        setVideoEditId: (state, action) => {
            state.videoEditId = action.payload;
        },
        toggleAssignmentEditOpen: state => {
            state.assignmentEditOpen = !state.assignmentEditOpen;
        },
        setAssignmentEditId: (state, action) => {
            state.assignmentEditId = action.payload;
        },
    },
});

export default modalSlice;
export const {
    toggleAddOpen,
    toggleVideoEditOpen,
    setVideoEditId,
    toggleAssignmentEditOpen,
    setAssignmentEditId,
} = modalSlice.actions;
