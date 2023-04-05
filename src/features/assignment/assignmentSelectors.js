import { useSelector } from "react-redux";

export const selectAssignmentEditId = () => {
    return useSelector(state => state?.modal?.assignmentEditId);
};
