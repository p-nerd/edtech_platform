import { useSelector } from "react-redux";

export const selectVideoEditId = () => {
    return useSelector(state => state?.modal?.videoEditId);
};
