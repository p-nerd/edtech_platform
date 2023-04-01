import { useSelector } from "react-redux";

export const selectAuthError = () => {
    return useSelector(state => state?.auth?.error);
};

export const selectAuth = () => {
    return useSelector(state => state?.auth);
};

export const selectUser = () => {
    return useSelector(state => state?.auth?.user);
};
