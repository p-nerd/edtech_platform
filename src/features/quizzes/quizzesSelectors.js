import { useSelector } from "react-redux";

export const selectQuizEditId = () => {
    return useSelector(state => state?.modal?.quizEditId);
};
