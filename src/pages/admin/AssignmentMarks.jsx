import { useState } from "react";
import AssignmentMarkItem from "../../components/admin/assignmentMarks/AssignmentMarkItem";
import AdminLayout from "../../components/layouts/AdminLayout";
import { useGetAssignmentMarksQuery } from "../../features/assignmentMark/assignmentMarkApi";
import useSetTitle from "../../hooks/useSetTitle";

const AssignmentMarks = () => {
    useSetTitle("Assignment Mark List");

    const [filter, setFilter] = useState("total");

    const { data: assignmentMarks, isLoading, error } = useGetAssignmentMarksQuery();

    const doFilter = () => {
        if (filter === "total") return assignmentMarks;
        return assignmentMarks?.filter(a => a.status === filter);
    };

    return (
        <AdminLayout>
            <section className="bg-primary py-6">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="bg-opacity-10 px-3 py-20">
                        <ul className="assignment-status">
                            <li
                                className={`cursor-pointer ${
                                    filter === "total" ? "bg-[#4F46E5]" : ""
                                }`}
                                onClick={() => setFilter("total")}
                            >
                                Total <span>{assignmentMarks?.length}</span>
                            </li>
                            <li
                                className={`cursor-pointer ${
                                    filter === "pending" ? "bg-[#16A34A]" : ""
                                }`}
                                onClick={() => setFilter("pending")}
                            >
                                Pending
                                <span>
                                    {assignmentMarks?.filter(a => a.status === "pending")?.length}
                                </span>
                            </li>
                            <li
                                className={`cursor-pointer ${
                                    filter === "published" ? "bg-[#D29C2B]" : ""
                                }`}
                                onClick={() => setFilter("published")}
                            >
                                Mark Sent
                                <span>
                                    {assignmentMarks?.filter(a => a.status === "published")?.length}
                                </span>
                            </li>
                        </ul>
                        <div className="mt-4 overflow-x-auto">
                            {isLoading ? (
                                <>Loading...</>
                            ) : error ? (
                                <>{error?.data}</>
                            ) : assignmentMarks && assignmentMarks?.length === 0 ? (
                                <>There is no assignmentMarks</>
                            ) : (
                                <table className="divide-y-1 w-full divide-gray-600 text-base">
                                    <thead>
                                        <tr>
                                            <th className="table-th">Assignment</th>
                                            <th className="table-th">Date</th>
                                            <th className="table-th">Student Name</th>
                                            <th className="table-th">Repo Link</th>
                                            <th className="table-th">Mark</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-600/50">
                                        {doFilter(assignmentMarks).map(assignmentMark => (
                                            <AssignmentMarkItem
                                                key={assignmentMark.id}
                                                assignmentMark={assignmentMark}
                                            />
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

export default AssignmentMarks;
