import { useEffect, useState } from "react";
import LeaderboardItem from "../components/students/LeaderboardItem";
import LeaderboardTitle from "../components/students/LeaderboardTitle";
import StudentLayout from "../components/students/StudentLayout";
import { useGetAssignmentMarksQuery } from "../features/assignmentMark/assignmentMarkApi";
import { selectUser } from "../features/auth/authSelectors";
import { useGetQuizMarksQuery } from "../features/quizMark/quizMarkApi";
import { errorTost } from "../utils/commonUtil";
import useSetTitle from "../hooks/useSetTitle";

const getStudentsFormAssignmentMarks = assignmentMarks => {
    let students = [];
    assignmentMarks.forEach(a => {
        if (a.status === "published") {
            const studentIndex = students.findIndex(s => s.id === a.student_id);
            if (studentIndex === -1) {
                students.push({
                    id: a.student_id,
                    name: a.student_name,
                    assignmentMark: Number(a.mark),
                    quizMark: 0,
                    rank: -1,
                });
            } else {
                students[studentIndex] = {
                    ...students[studentIndex],
                    assignmentMark: students[studentIndex].assignmentMark + Number(a.mark),
                };
            }
        }
    });
    return students;
};

const mutateStudentsWithQuizMarks = (students, quizMarks) => {
    quizMarks.forEach(q => {
        const studentIndex = students.findIndex(s => s.id === q.student_id);
        if (studentIndex === -1) {
            students.push({
                id: q.student_id,
                name: q.student_name,
                assignmentMark: 0,
                quizMark: Number(q.totalMark),
                rank: -1,
            });
        } else {
            students[studentIndex] = {
                ...students[studentIndex],
                quizMark: students[studentIndex].quizMark + Number(q.totalMark),
            };
        }
    });
    return students;
};

const sortStudentsByTotalMarks = students => {
    return students.sort((a, b) => {
        const totalMarksA = a.assignmentMark + a.quizMark;
        const totalMarksB = b.assignmentMark + b.quizMark;
        return totalMarksB - totalMarksA;
    });
};

const mutateStudentsWithProperRank = students => {
    let lastTotalMark = Infinity;
    let lastRank = 0;

    return students.map(student => {
        const totalMark = student.assignmentMark + student.quizMark;
        if (totalMark !== lastTotalMark) {
            lastRank++;
        }
        lastTotalMark = totalMark;
        return { ...student, rank: lastRank };
    });
};

const getLoggedStudent = (students, userId) => {
    const you = students.find(s => s.id === userId);
    if (you) {
        return you;
    } else {
        return {
            id: loggedUser?.id,
            name: loggedUser?.name,
            assignmentMark: 0,
            quizMark: 0,
            rank: -1,
        };
    }
};

const Leaderboard = () => {
    useSetTitle("Leaderboard");

    const loggedUser = selectUser();

    const [students, setStudents] = useState(null);
    const [you, setYou] = useState(null);

    const {
        data: assignmentMarks,
        error: assignmentMarksError,
        isLoading: isAssignmentMarksLoading,
    } = useGetAssignmentMarksQuery();
    const {
        data: quizMarks,
        error: quizMarksError,
        isLoading: isQuizMarksLoading,
    } = useGetQuizMarksQuery();

    useEffect(() => {
        if (assignmentMarksError) {
            errorTost(assignmentMarks?.data);
        }
        if (quizMarksError) {
            errorTost(quizMarksError?.data);
        }
    }, [assignmentMarksError, quizMarksError]);

    useEffect(() => {
        if (
            assignmentMarks &&
            quizMarks &&
            assignmentMarks.length !== 0 &&
            quizMarks.length !== 0
        ) {
            let students = getStudentsFormAssignmentMarks(assignmentMarks);
            students = mutateStudentsWithQuizMarks(students, quizMarks);
            students = sortStudentsByTotalMarks(students);
            students = mutateStudentsWithProperRank(students);

            setYou(getLoggedStudent(students, loggedUser?.id));

            students = students.filter(student => student.rank <= 20);
            setStudents(students);
        }
    }, [assignmentMarks, quizMarks]);

    return (
        <StudentLayout>
            <section className="bg-primary py-6">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    {isAssignmentMarksLoading || isQuizMarksLoading ? (
                        <>Loading...</>
                    ) : !students ? (
                        <>There is not students</>
                    ) : (
                        <>
                            <div>
                                <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
                                <table className="my-4 w-full rounded-md border border-slate-600/50 text-base">
                                    <LeaderboardTitle />
                                    <tbody>
                                        {you ? <LeaderboardItem student={you} isYou /> : ""}
                                    </tbody>
                                </table>
                            </div>
                            <div className="my-8">
                                <h3 className="text-lg font-bold">Top 20 Result</h3>
                                <table className="my-4 w-full rounded-md border border-slate-600/50 text-base">
                                    <LeaderboardTitle isBorder />
                                    <tbody>
                                        {students.map((student, index) => (
                                            <LeaderboardItem key={index} student={student} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </StudentLayout>
    );
};

export default Leaderboard;
