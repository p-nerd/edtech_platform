import { useSelector } from "react-redux";

export const selectActiveVideo = () => {
    return useSelector(state => state?.videos?.activeVideo);
};
