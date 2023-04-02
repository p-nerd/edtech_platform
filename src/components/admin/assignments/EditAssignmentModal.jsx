import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    useEditAssignmentMutation,
    useGetAssignmentsQuery,
} from "../../../features/assignment/assignmentApi";
import { setAssignmentEditId } from "../../../features/modal/modalSlice";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { errorTost } from "../../../utils/commonUtil";
import SubmitButton from "../../auths/SubmitButton";
import InputField from "../modals/InputField";
import Modal from "../modals/Modal";
import OptionsField from "../modals/OptionsField";

const EditAssignmentModal = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [videoId, setVideoId] = useState("none");
    const [totalMark, setTotalMark] = useState("");

    const assignmentEditId = useSelector(state => state?.modal?.assignmentEditId);

    const { data: videos, error: videoError } = useGetVideosQuery();
    const { data: assignments, error: assignmentError } = useGetAssignmentsQuery();

    const [editAssignment, { isLoading, isSuccess, error }] = useEditAssignmentMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
        if (videoError) {
            errorTost(videoError?.data);
        }
        if (assignmentError) {
            errorTost(assignmentError?.data);
        }
    }, [error, videoError, assignmentError]);

    useEffect(() => {
        if (assignmentEditId && assignments && assignments?.length !== 0) {
            const assignment = assignments?.find(a => a.id === assignmentEditId);
            if (assignment) {
                setTitle(assignment.title);
                setVideoId(assignment.video_id);
                setTotalMark(assignment.totalMark);
            }
        }
    }, [assignmentEditId, assignments]);

    useEffect(() => {
        if (isSuccess) {
            setTitle("");
            setVideoId("none");
            setTotalMark("");
            handleClose(false);
        }
    }, [isSuccess]);

    const handleClose = () => {
        dispatch(setAssignmentEditId(0));
    };

    const handleSubmit = () => {
        if (videoId === "none") {
            errorTost("Choose video is required");
        } else if (videos && videos.length !== 0) {
            editAssignment({
                id: assignmentEditId,
                data: {
                    title,
                    video_id: videoId,
                    video_title: videos.find(v => v.id === videoId)?.title,
                    totalMark,
                },
            });
        }
    };

    return (
        <div className="flex w-full">
            <Modal title="Update Assignment" show={assignmentEditId} onClose={handleClose}>
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
                        <SubmitButton disabled={isLoading} label="Update Assignment" />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EditAssignmentModal;
