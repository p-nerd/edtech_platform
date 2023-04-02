import { useEffect, useState } from "react";
import { useAddQuizMutation } from "../../../features/quizzes/quizzesApi";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { errorTost } from "../../../utils/tost";
import SubmitButton from "../../auths/SubmitButton";
import InputField from "../modals/InputField";
import Modal from "../modals/Modal";
import OptionsField from "../modals/OptionsField";
import QuizOptions from "./QuizOptions";

const AddQuizModal = () => {
    const [open, setOpen] = useState(false);

    const [question, setQuestion] = useState("");
    const [videoId, setVideoId] = useState("none");
    const [options, setOptions] = useState([]);

    const { data: videos, error: videoError } = useGetVideosQuery();

    const [addQuiz, { isLoading, isSuccess, error }] = useAddQuizMutation();

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
            setQuestion("");
            setVideoId("none");
            setOptions([]);
            setOpen(false);
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        if (videoId === "none") {
            errorTost("Choose video is required");
        } else if (options?.length !== 4) {
            errorTost("4 options are required");
        } else if (videos && videos.length !== 0) {
            addQuiz({
                question,
                video_id: videoId,
                video_title: videos.find(v => v.id === videoId)?.title,
                options,
            });
        }
    };

    return (
        <div className="flex w-full">
            <button className="btn ml-auto" onClick={() => setOpen(prev => !prev)}>
                Add Quiz
            </button>
            <Modal title="Add Assignment" show={open} onClose={setOpen}>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <div className=" space-y-3">
                        <InputField
                            value={question}
                            setValue={setQuestion}
                            label="Question"
                            id="question"
                            ph="Enter question title"
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
                        <QuizOptions options={options} setOptions={setOptions} />
                        <SubmitButton disabled={isLoading} label="Save Assignment" />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default AddQuizModal;
