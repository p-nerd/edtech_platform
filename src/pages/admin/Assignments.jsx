import AdminLayout from "../../components/admin/AdminLayout";
import AddAssignmentModal from "../../components/admin/assignments/AddAssignmentModal";
import AssignmentItem from "../../components/admin/assignments/AssignmentItem";
import EditAssignmentModal from "../../components/admin/assignments/EditAssignmentModal";
import { useGetAssignmentsQuery } from "../../features/assignment/assignmentApi";
import useSetTitle from "../../hooks/useSetTitle";

const Assignments = () => {
    useSetTitle("Assignment List");

    const { data: assignments, isLoading, error } = useGetAssignmentsQuery();

    return (
        <AdminLayout>
            <section className="bg-primary py-6">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="bg-opacity-10 px-3 py-20">
                        <AddAssignmentModal />
                        <EditAssignmentModal />
                        <div className="mt-4 overflow-x-auto">
                            {isLoading ? (
                                <div className="text-center">Loading...</div>
                            ) : error ? (
                                <div className="text-center">{error?.data}</div>
                            ) : assignments && assignments?.length === 0 ? (
                                <div className="text-center">There is no videos</div>
                            ) : (
                                <table className="divide-y-1 w-full divide-gray-600 text-base">
                                    <thead>
                                        <tr>
                                            <th className="table-th">Title</th>
                                            <th className="table-th">Video Title</th>
                                            <th className="table-th">Mark</th>
                                            <th className="table-th">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-600/50">
                                        {assignments.map(assignment => (
                                            <AssignmentItem
                                                key={assignment.id}
                                                assignment={assignment}
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

export default Assignments;
