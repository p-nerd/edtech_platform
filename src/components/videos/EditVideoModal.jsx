import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleVideoEditOpen } from "../../features/modal/modalSlice";
import { useEditVideoMutation, useGetVideosQuery } from "../../features/videos/videosApi";
import { errorTost } from "../../utils/tost";
import SubmitButton from "../auths/SubmitButton";
import InputField from "../modals/InputField";
import Modal from "../modals/Modal";
import TextAreaField from "../modals/TextAreaField";

const EditVideoModal = () => {
    const dispatch = useDispatch();
    const videoEditOpen = useSelector(state => state?.modal?.videoEditOpen);
    const videoEditId = useSelector(state => state?.modal?.videoEditId);

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [views, setViews] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");

    const setOpen = () => {
        dispatch(toggleVideoEditOpen());
    };

    const { data: videos, error: videosError } = useGetVideosQuery();

    useEffect(() => {
        if (videoEditOpen && videoEditId && videos && videos?.length !== 0) {
            const video = videos?.find(v => v.id === videoEditId);
            if (video) {
                setTitle(video.title);
                setLink(video.url);
                setViews(video.views);
                setDuration(video.duration);
                setDescription(video.description);
            }
        }
    }, [videoEditId, videoEditOpen, videos]);

    const [editVideo, { isSuccess, error }] = useEditVideoMutation();

    const handleSubmit = () => {
        editVideo({
            id: videoEditId,
            data: {
                title,
                url: link,
                views,
                duration,
                description,
            },
        });
    };

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
        if (videosError) {
            errorTost(videosError?.data);
        }
    }, [error, videosError]);

    return (
        <div className="flex w-full">
            <Modal title="Edit Video" open={videoEditOpen} setOpen={setOpen}>
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
                            ph="Enter video title"
                        />
                        <InputField
                            value={link}
                            setValue={setLink}
                            label="Link"
                            id="url"
                            ph="Enter video link"
                        />
                        <div className="flex space-x-3">
                            <InputField
                                notRequired
                                value={views}
                                setValue={setViews}
                                label="Views"
                                id="views"
                                ph="Enter views (like: 51.2K)"
                            />
                            <InputField
                                notRequired
                                value={duration}
                                setValue={setDuration}
                                label="Duration"
                                id="duration"
                                ph="Enter duration (like: 5:30)"
                            />
                        </div>
                        <TextAreaField
                            value={description}
                            setValue={setDescription}
                            label="Description"
                            id="description"
                            ph="Enter the description"
                        />
                        <SubmitButton label="Update Video" />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EditVideoModal;
