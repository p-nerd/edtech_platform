import { useEffect, useState } from "react";
import {
    useAddAssignmentMutation,
    useGetAssignmentsQuery,
} from "../../../features/assignment/assignmentApi";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { filteredVideosForAssignmentOptions } from "../../../utils/assignmentsUtil";
import { errorTost } from "../../../utils/commonUtil";
import SubmitButton from "../../auths/SubmitButton";
import InputField from "../../modals/InputField";
import Modal from "../../modals/Modal";
import OptionsField from "../../modals/OptionsField";

const AddAssignmentModal = () => {
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [videoId, setVideoId] = useState("none");
    const [totalMark, setTotalMark] = useState("");

    const [videosForOptions, setVideosForOptions] = useState(null);

    const { data: videos, error: videoError } = useGetVideosQuery();
    const { data: assignments, error: assignmentsError } = useGetAssignmentsQuery();

    const [addAssignment, { isLoading, isSuccess, error }] = useAddAssignmentMutation();

    useEffect(() => {
        if ((assignments, videos)) {
            setVideosForOptions(filteredVideosForAssignmentOptions(videos, assignments));
        }
    }, [assignments, videos]);

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
        if (videoError) {
            errorTost(videoError?.data);
        }
        if (assignmentsError) {
            errorTost(assignmentsError?.data);
        }
    }, [error, videoError]);

    useEffect(() => {
        if (isSuccess) {
            setTitle("");
            setVideoId("none");
            setTotalMark("");
            setOpen(false);
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        if (videoId === "none") {
            errorTost("Choose video is required");
        } else if (videos && videos.length !== 0) {
            addAssignment({
                title,
                video_id: videoId,
                video_title: videos.find(v => v.id === videoId)?.title,
                totalMark: Number(totalMark),
            });
        }
    };

    const handleOpenAddAssignmentModal = () => {
        setOpen(true);
    };

    const handleCloseAddAssignmentModal = () => {
        setOpen(false);
    };

    return (
        <div className="flex w-full">
            <button className="btn ml-auto" onClick={handleOpenAddAssignmentModal}>
                Add Assignment
            </button>
            <Modal title="Add Assignment" show={open} onClose={handleCloseAddAssignmentModal}>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className=" space-y-3">
                        <InputField
                            value={title}
                            setValue={setTitle}
                            label="Title"
                            id="title"
                            ph="Enter assignment title"
                        />
                        {videos &&
                        videos.length !== 0 &&
                        videosForOptions &&
                        videosForOptions.length === 0 ? (
                            <div className="space-y-3 rounded bg-[#1E293B] p-4">
                                You don't have videos for add Assignment
                            </div>
                        ) : (
                            <OptionsField
                                options={videosForOptions}
                                value={videoId}
                                setValue={setVideoId}
                                label="Choose The Video"
                                id="chooseVideo"
                                ph="Choose the video"
                            />
                        )}
                        <InputField
                            value={totalMark}
                            setValue={setTotalMark}
                            label="Total Mark"
                            id="totalMark"
                            ph="Enter Total Mark (like: 100)"
                        />
                        <SubmitButton disabled={isLoading} label="Save Assignment" />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddAssignmentModal;
