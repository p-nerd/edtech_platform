import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentLayout from "../components/students/StudentLayout";
import DisplayQuizItem from "../components/students/quiz/DisplayQuizItem";
import { selectUser } from "../features/auth/authSelectors";
import {
    useAddQuizMarkMutation,
    useGetQuizMarkByVideoAndStudentQuery,
} from "../features/quizMark/quizMarkApi";
import { useGetQuizzesByVideoQuery } from "../features/quizzes/quizzesApi";
import { errorTost, normalTost } from "../utils/commonUtil";

const findAnswer = (answers, quizNo, optionNo) => {
    return answers.find(a => a.quizNo === quizNo && a.optionNo === optionNo);
};

const getQuizzesAnsweredLength = answers => {
    const len = answers.length;
    const answeredQuiz = new Map();
    for (let i = 0; i < len; i++) {
        answeredQuiz.set(answers[i].quizNo, true);
    }
    return answeredQuiz.size;
};

const getCorrectAnswers = (quizzes, answers) => {
    return quizzes.filter((quiz, index) => {
        for (let i = 0; i < quiz.options.length; i++) {
            const ans = findAnswer(answers, index, i);
            if (quiz.options[i].isCorrect) {
                if (!ans) {
                    return false;
                }
            } else {
                if (ans) {
                    return false;
                }
            }
        }
        return true;
    });
};

const Quiz = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const loggedUser = selectUser();

    const [answers, setAnswers] = useState([]);

    const { data: quizzes, error, isLoading } = useGetQuizzesByVideoQuery(id);
    const { data: quizMark, error: quizMarkError } = useGetQuizMarkByVideoAndStudentQuery({
        videoId: id,
        studentId: loggedUser?.id,
    });

    const [addQuizMark, { error: addQuizMarkError }] = useAddQuizMarkMutation();

    useEffect(() => {
        if (addQuizMarkError) {
            errorTost(addQuizMarkError?.data);
        }
    }, [addQuizMarkError]);

    const addOrRemoveAnswer = ({ quizNo, optionNo }) => {
        let foundedId = -1;
        const len = answers.length;
        for (let i = 0; i < len; i++) {
            if (answers[i].quizNo === quizNo && answers[i].optionNo === optionNo) {
                foundedId = i;
                break;
            }
        }
        if (foundedId !== -1) {
            setAnswers(answers.filter((_, i) => i !== foundedId));
        } else {
            setAnswers([...answers, { quizNo, optionNo }]);
        }
    };

    const handleSubmit = () => {
        if (getQuizzesAnsweredLength(answers) !== quizzes.length) {
            normalTost("Please answer all the quizzes");
            return;
        }
        const correctAnswers = getCorrectAnswers(quizzes, answers);
        const totalCorrect = correctAnswers.length;

        addQuizMark({
            student_id: loggedUser?.id,
            student_name: loggedUser?.name,
            video_id: Number(id),
            video_title: quizzes[0].video_title,
            totalQuiz: quizzes.length,
            totalCorrect: totalCorrect,
            totalWrong: quizzes.length - totalCorrect,
            totalMark: totalCorrect * 5,
            mark: 5,
        });
        navigate("/leaderboard");
    };

    return (
        <StudentLayout>
            <section className="bg-primary py-6">
                {isLoading ? (
                    <div className=" text-center">Loading...</div>
                ) : error ? (
                    <div className=" text-center">{error?.data}</div>
                ) : !quizzes || quizzes?.length === 0 ? (
                    <div className=" text-center">Three is no quiz for this video</div>
                ) : quizMark ? (
                    <div className=" text-center">
                        <h3>You have already taken this quiz.</h3>
                        <div>
                            <p>You answered {quizMark.totalCorrect} questions correctly.</p>
                            <p>You received {quizMark.totalMark} marks.</p>
                            {quizMark.totalWrong !== 0 && (
                                <p>
                                    You also answered {quizMark.totalWrong} questions incorrectly.
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto max-w-7xl px-5 lg:px-0">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold">
                                Quizzes for "{quizzes[0]?.video_title}"
                            </h1>
                            <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
                        </div>
                        <div className="space-y-8 ">
                            {quizzes.map((quiz, index) => (
                                <DisplayQuizItem
                                    addOrRemoveAnswer={addOrRemoveAnswer}
                                    key={index}
                                    quizNo={index + 1}
                                    quiz={quiz}
                                />
                            ))}
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="bg-cyan ml-auto mt-8 block rounded-full px-4 py-2 hover:opacity-90 active:scale-95 active:opacity-100 "
                        >
                            Submit
                        </button>
                    </div>
                )}
            </section>
        </StudentLayout>
    );
};

export default Quiz;
