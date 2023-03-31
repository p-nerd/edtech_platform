import { useSelector } from "react-redux";

const useIsLoggedIn = () => {
    const auth = useSelector(state => state.auth);

    if (auth?.accessToken && auth?.user) {
        return true;
    }
    return false;
};

export default useIsLoggedIn;
