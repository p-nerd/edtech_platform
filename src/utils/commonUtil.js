import { toast } from "react-toastify";

export const errorTost = message => {
    toast.error(message);
};

export const normalTost = message => {
    toast(message);
};

export const sliceStr = (stringValue, length) => {
    return stringValue?.slice(0, length) + (stringValue?.length >= length ? "..." : "");
};
