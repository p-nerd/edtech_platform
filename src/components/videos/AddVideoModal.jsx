import { useEffect, useState } from "react";
import { useAddVideoMutation } from "../../features/videos/videosApi";
import { errorTost } from "../../utils/tost";
import SubmitButton from "../auths/SubmitButton";
import InputField from "../modals/InputField";
import Modal from "../modals/Modal";
import TextAreaField from "../modals/TextAreaField";

const AddVideoModal = () => {
    const [open, setOpen] = useState(false);

    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [views, setViews] = useState("");
    const [duration, setDuration] = useState("");
    const [description, setDescription] = useState("");

    const [addVideo, { isLoading, isSuccess, error }] = useAddVideoMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    useEffect(() => {
        if (isSuccess) {
            setTitle("");
            setLink("");
            setViews("");
            setDuration("");
            setDescription("");
            setOpen(false);
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        addVideo({
            title,
            url: link,
            views,
            duration,
            description,
            createdAt: new Date().toISOString(),
        });
    };

    return (
        <div className="flex w-full">
            <button className="btn ml-auto" onClick={() => setOpen(prev => !prev)}>
                Add Video
            </button>
            <Modal title="Add Video" show={open} onClose={() => setOpen(false)}>
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
                        <SubmitButton disabled={isLoading} label="Save Video" />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddVideoModal;
