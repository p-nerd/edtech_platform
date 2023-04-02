import { useEffect, useState } from "react";
import { useAddAssignmentMutation } from "../../features/assignment/assignmentApi";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import { errorTost } from "../../utils/tost";
import SubmitButton from "../auths/SubmitButton";
import InputField from "../modals/InputField";
import Modal from "../modals/Modal";
import OptionsField from "../modals/OptionsField";

const AddAssignmentModal = () => {
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [videoId, setVideoId] = useState("none");
    const [totalMark, setTotalMark] = useState("");

    const { data: videos, error: videoError } = useGetVideosQuery();

    const [addAssignment, { isLoading, isSuccess, error }] = useAddAssignmentMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
        if (videoError) {
            errorTost(videoError?.data);
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
                totalMark,
            });
        }
    };

    return (
        <div className="flex w-full">
            <button className="btn ml-auto" onClick={() => setOpen(true)}>
                Add Assignment
            </button>
            <Modal title="Add Assignment" show={open} onClose={() => setOpen(false)}>
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
                        {videos && videos.length !== 0 && (
                            <OptionsField
                                options={videos?.map(({ id, title }) => ({
                                    id,
                                    label: title,
                                }))}
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
