import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setQuizEditId } from "../../../features/modal/modalSlice";
import { useEditQuizMutation, useGetQuizzesQuery } from "../../../features/quizzes/quizzesApi";
import { selectQuizEditId } from "../../../features/quizzes/quizzesSelectors";
import { useGetVideosQuery } from "../../../features/videos/videosApi";
import { errorTost } from "../../../utils/commonUtil";
import SubmitButton from "../../auths/SubmitButton";
import InputField from "../../modals/InputField";
import Modal from "../../modals/Modal";
import OptionsField from "../../modals/OptionsField";
import QuizOptions from "./QuizOptions";

const EditQuizModal = () => {
    const dispatch = useDispatch();

    const quizEditId = selectQuizEditId();

    const [question, setQuestion] = useState("");
    const [videoId, setVideoId] = useState("none");
    const [options, setOptions] = useState([]);

    const { data: videos, error: videoError } = useGetVideosQuery();
    const { data: quizzes, error: quizzesError } = useGetQuizzesQuery();

    const [editQuiz, { isLoading, isSuccess, error }] = useEditQuizMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
        if (videoError) {
            errorTost(videoError?.data);
        }
        if (quizzesError) {
            errorTost(quizzesError?.data);
        }
    }, [error, videoError, quizzesError]);

    useEffect(() => {
        if (quizEditId && quizzes && quizzes?.length !== 0) {
            const quiz = quizzes?.find(q => q.id === quizEditId);
            if (quiz) {
                setQuestion(quiz.question);
                setVideoId(quiz.video_id);
                setOptions(quiz.options);
            }
        }
    }, [quizEditId, quizzes]);

    const handleCloseModal = () => {
        dispatch(setQuizEditId(0));
    };

    useEffect(() => {
        if (isSuccess) {
            setQuestion("");
            setVideoId("none");
            setOptions([]);
            handleCloseModal(false);
        }
    }, [isSuccess]);

    const handleSubmit = () => {
        if (videoId === "none") {
            errorTost("Choose video is required");
        } else if (options?.length !== 4) {
            errorTost("4 options are required");
        } else if (videos && videos.length !== 0) {
            editQuiz({
                id: quizEditId,
                data: {
                    question,
                    video_id: videoId,
                    video_title: videos.find(v => v.id === videoId)?.title,
                    options,
                },
            });
        }
    };

    return (
        <div className="flex w-full">
            <Modal title="Edit Quiz" show={quizEditId} onClose={handleCloseModal}>
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
                        <SubmitButton disabled={isLoading} label="Update Assignment" />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EditQuizModal;
