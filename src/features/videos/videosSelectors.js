import { useSelector } from "react-redux";

export const selectActiveVideo = () => useSelector(state => state?.videos?.activeVideo);
