import AdminLayout from "../../components/admin/AdminLayout";
import AddQuizModal from "../../components/admin/quizzes/AddQuizModal";
import EditQuizModal from "../../components/admin/quizzes/EditQuizModal";
import QuizItem from "../../components/admin/quizzes/QuizItem";
import { useGetQuizzesQuery } from "../../features/quizzes/quizzesApi";
import useSetTitle from "../../hooks/useSetTitle";

const Quizzes = () => {
    useSetTitle("Quiz List");

    const { data: quizzes, isLoading, error } = useGetQuizzesQuery();

    return (
        <AdminLayout>
            <section className="bg-primary py-6">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="bg-opacity-10 px-3 py-20">
                        <AddQuizModal />
                        <EditQuizModal />
                        <div className="mt-4 overflow-x-auto">
                            {isLoading ? (
                                <div className="text-center">Loading...</div>
                            ) : error ? (
                                <div className="text-center">{error?.data}</div>
                            ) : quizzes && quizzes?.length === 0 ? (
                                <div className="text-center">There is no quizzes</div>
                            ) : (
                                <table className="divide-y-1 w-full divide-gray-600 text-base">
                                    <thead>
                                        <tr>
                                            <th className="table-th">Question</th>
                                            <th className="table-th">Video</th>
                                            <th className="table-th justify-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-600/50">
                                        {quizzes.map(quiz => (
                                            <QuizItem key={quiz.id} quiz={quiz} />
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
};

export default Quizzes;
