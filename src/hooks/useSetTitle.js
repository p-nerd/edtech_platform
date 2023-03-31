import { useEffect } from "react";

const useSetTitle = title => {
    useEffect(() => {
        document.title = `${title} - Learning Portal`;
    }, []);
};

export default useSetTitle;
