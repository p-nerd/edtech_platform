import { selectAuth } from "../features/auth/authSelectors";

const useIsAdmin = () => {
    const auth = selectAuth();

    if (auth?.accessToken && auth?.user && auth?.user?.role === "admin") {
        return true;
    }
    return false;
};

export default useIsAdmin;
