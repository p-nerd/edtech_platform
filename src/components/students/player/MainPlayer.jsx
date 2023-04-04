import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAssignmentByVideoQuery } from "../../../features/assignment/assignmentApi";
import { useGetAssignmentMarkByAssignmentAndStudentQuery } from "../../../features/assignmentMark/assignmentMarkApi";
import { selectUser } from "../../../features/auth/authSelectors";
import { useGetQuizzesByVideoQuery } from "../../../features/quizzes/quizzesApi";
import { selectActiveVideo } from "../../../features/videos/videosSelectors";
import { errorTost } from "../../../utils/commonUtil";
import { convertDate } from "../../../utils/dateUtil";
import SubmitAssignment from "./SubmitAssignment";

const MainPlayer = () => {
    const activeVideo = selectActiveVideo();
    const loggedUser = selectUser();

    const [fetchAssignment, setFetchAssignment] = useState(false);
    const [fetchAssignmentMark, setFetchAssignmentMark] = useState(false);
    const [fetchQuiz, setFetchQuiz] = useState(false);
    const [open, setOpen] = useState(false);

    const { data: assignment, error: assignmentError } = useGetAssignmentByVideoQuery(
        activeVideo?.id,
        { skip: !fetchAssignment }
    );
    const { data: quizzes, error: quizzesError } = useGetQuizzesByVideoQuery(activeVideo?.id, {
        skip: !fetchQuiz,
    });

    const { data: assignmentMark, error: assignmentMarkError } =
        useGetAssignmentMarkByAssignmentAndStudentQuery(
            { assignmentId: assignment?.id, studentId: loggedUser?.id },
            { skip: !fetchAssignmentMark }
        );

    useEffect(() => {
        if (assignmentError) {
            errorTost(assignmentError?.data);
        }
        if (assignmentMarkError) {
            errorTost(assignmentMarkError?.data);
        }
        if (quizzesError) {
            errorTost(quizzesError?.data);
        }
    }, [assignmentError, assignmentMarkError, quizzesError]);

    useEffect(() => {
        if (activeVideo?.id) {
            setFetchAssignment(true);
            setFetchQuiz(true);
        }
    }, [activeVideo]);

    useEffect(() => {
        if (assignment?.id) {
            setFetchAssignmentMark(true);
        }
    }, [assignment]);

    console.log(quizzes);

    return (
        <>
            {activeVideo && (
                <div className="col-span-full w-full space-y-8 lg:col-span-2">
                    <iframe
                        width="100%"
                        className="aspect-video"
                        src={activeVideo?.url}
                        title="Things I wish I knew as a Junior Web Developer - Sumit Saha - BASIS SoftExpo 2023"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight text-slate-100">
                            {activeVideo?.title}
                        </h1>
                        <h2 className=" pb-4 text-sm leading-[1.7142857] text-slate-400">
                            Uploaded on {convertDate(activeVideo.createdAt)}
                        </h2>
                        <div className="flex gap-4">
                            {assignmentMark ? (
                                <p className="border-cyan text-cyan hover:bg-cyan hover:text-primary rounded-full border px-3 py-1 text-sm font-bold">
                                    এসাইনমেন্ট (
                                    {assignmentMark?.status === "published"
                                        ? `প্রাপ্ত নাম্বার: ${assignmentMark?.mark}`
                                        : "বিচারাধীন আছে"}
                                    )
                                </p>
                            ) : assignment ? (
                                <>
                                    <p
                                        onClick={() => setOpen(true)}
                                        className="border-cyan text-cyan hover:bg-cyan hover:text-primary cursor-pointer rounded-full border px-3 py-1 text-sm font-bold"
                                    >
                                        এসাইনমেন্ট
                                    </p>
                                    {open && (
                                        <SubmitAssignment
                                            assignment={assignment}
                                            student={loggedUser}
                                            show={open}
                                            onClose={() => setOpen(false)}
                                        />
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                            {quizzes?.length > 0 ? (
                                <Link
                                    to={`/quiz/${activeVideo?.id}`}
                                    className="border-cyan text-cyan hover:bg-cyan hover:text-primary rounded-full border px-3 py-1 text-sm font-bold"
                                >
                                    কুইজে অংশগ্রহণ করুন
                                </Link>
                            ) : (
                                <></>
                            )}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-400">
                            {activeVideo?.description}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MainPlayer;
