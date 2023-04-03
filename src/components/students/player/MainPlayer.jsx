import { useEffect } from "react";
import { useGetAssignmentByVideoQuery } from "../../../features/assignment/assignmentApi";
import { useGetAssignmentMarkByAssignmentAndStudentQuery } from "../../../features/assignmentMark/assignmentMarkApi";
import { selectUser } from "../../../features/auth/authSelectors";
import { selectActiveVideo } from "../../../features/videos/videosSelectors";
import { errorTost } from "../../../utils/commonUtil";
import { convertDate } from "../../../utils/dateUtil";

const MainPlayer = () => {
    const activeVideo = selectActiveVideo();
    const loggedUser = selectUser();

    const { data: assignment, error: assignmentError } = useGetAssignmentByVideoQuery(
        activeVideo?.id,
        { skip: !activeVideo?.id }
    );
    const { data: assignmentMark, error } = useGetAssignmentMarkByAssignmentAndStudentQuery(
        { assignmentId: assignment?.id, studentId: loggedUser?.id },
        { skip: !assignment?.id }
    );

    useEffect(() => {
        if (assignmentError) {
            errorTost(assignmentError?.data);
        }
        if (error) {
            errorTost(error?.data);
        }
    }, [assignmentError, error]);

    // console.log(assignment, assignmentMark);

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
                                <p className="border-cyan text-cyan hover:bg-cyan hover:text-primary cursor-pointer rounded-full border px-3 py-1 text-sm font-bold">
                                    এসাইনমেন্ট
                                </p>
                            ) : (
                                <></>
                            )}
                            <a
                                href="./Quiz.html"
                                className="border-cyan text-cyan hover:bg-cyan hover:text-primary rounded-full border px-3 py-1 text-sm font-bold"
                            >
                                কুইজে অংশগ্রহণ করুন
                            </a>
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
