import StudentLayout from "../components/students/StudentLayout";
import LeaderboardItem from "../components/students/LeaderboardItem";
import LeaderboardTitle from "../components/students/LeaderboardTitle";

const Leaderboard = () => {
    const students = [
        {
            name: "Shihab Mahamud",
            quizMark: 90,
            assignmentMark: 200,
        },
        {
            name: "Saad Hasan",
            quizMark: 50,
            assignmentMark: 100,
        },
    ];
    return (
        <StudentLayout>
            <section className="bg-primary py-6">
                <div className="mx-auto max-w-7xl px-5 lg:px-0">
                    <div>
                        <h3 className="text-lg font-bold">Your Position in Leaderboard</h3>
                        <table className="my-4 w-full rounded-md border border-slate-600/50 text-base">
                            <LeaderboardTitle />
                            <tbody>
                                <LeaderboardItem student={students[0]} isYou />
                            </tbody>
                        </table>
                    </div>
                    <div className="my-8">
                        <h3 className="text-lg font-bold">Top 20 Result</h3>
                        <table className="my-4 w-full rounded-md border border-slate-600/50 text-base">
                            <LeaderboardTitle isBorder />
                            <tbody>
                                {students.map(student => (
                                    <LeaderboardItem student={student} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </StudentLayout>
    );
};

export default Leaderboard;
