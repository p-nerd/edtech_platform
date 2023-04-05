export const filteredVideosForAssignmentOptions = (videos, assignments, assignmentId = null) => {
    const filteredVideosForOptions = videos?.filter(video => {
        const assignment = assignments?.find(a => a.video_id === video.id);
        if (assignmentId && assignment?.id === assignmentId) return true;
        return assignment ? false : true;
    });
    const readyVideosForOptions = filteredVideosForOptions?.map(({ id, title }) => {
        return { id, label: title };
    });

    return readyVideosForOptions;
};
