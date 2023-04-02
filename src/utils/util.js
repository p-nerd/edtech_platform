export const sliceStr = (stringValue, length) => {
    return stringValue?.slice(0, length) + (stringValue?.length >= length ? "..." : "");
};

export const convertDateTime = dateTime => {
    const dateStr = dateTime;
    const dateObj = new Date(dateStr);

    const formattedDate = dateObj.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const formattedTime = dateObj.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    });

    return `${formattedDate} ${formattedTime}`;
};
