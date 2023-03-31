import { useSelector } from "react-redux";

const useIsAdmin = () => {
    const auth = useSelector(state => state.auth);

    if (auth?.accessToken && auth?.user && auth?.user?.role === "admin") {
        return true;
    }
    return false;
};

export default useIsAdmin;
