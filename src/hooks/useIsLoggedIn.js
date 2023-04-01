import { selectAuth } from "../features/auth/authSelectors";

const useIsLoggedIn = () => {
    const auth = selectAuth();

    if (auth?.accessToken && auth?.user) {
        return true;
    }
    return false;
};

export default useIsLoggedIn;
