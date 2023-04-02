export const sliceStr = (stringValue, length) => {
    return stringValue?.slice(0, length) + (stringValue?.length >= length ? "..." : "");
};
