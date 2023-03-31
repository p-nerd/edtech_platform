import AdminLayout from "../../components/layouts/AdminLayout";
import useSetTitle from "../../hooks/useSetTitle";

const AssignmentMarks = () => {
    useSetTitle("Assignment Mark List");

    return (
        <AdminLayout>
            <section className="bg-primary py-6">
                <div className="mx-auto max-w-full px-5 lg:px-20">
                    <div className="bg-opacity-10 px-3 py-20">
                        <ul className="assignment-status">
                            <li>
                                Total <span>4</span>
                            </li>
                            <li>
                                Pending <span>3</span>
                            </li>
                            <li>
                                Mark Sent <span>1</span>
                            </li>
                        </ul>
                        <div className="mt-4 overflow-x-auto">
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
                                    <tr>
                                        <td className="table-td">
                                            Assignment 1 - Implement Debounce Function
                                        </td>
                                        <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                                        <td className="table-td">Saad Hasan</td>
                                        <td className="table-td">
                                            https://github.com/Learn-with-Sumit/assignment-1
                                        </td>
                                        <td className="table-td input-mark">
                                            <input max={100} defaultValue={100} />
                                            <svg
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2}
                                                stroke="currentColor"
                                                className="h-6 w-6 cursor-pointer text-green-500 hover:text-green-400"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4.5 12.75l6 6 9-13.5"
                                                />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            Assignment 2 - Implement Best Practices
                                        </td>
                                        <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                                        <td className="table-td">Akash Ahmed</td>
                                        <td className="table-td">
                                            https://github.com/Learn-with-Sumit/assignment-1
                                        </td>
                                        <td className="table-td">50</td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            Assignment 1 - Scoreboard Application
                                        </td>
                                        <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                                        <td className="table-td">Ferdous</td>
                                        <td className="table-td">
                                            https://github.com/Learn-with-Sumit/assignment-1
                                        </td>
                                        <td className="table-td">100</td>
                                    </tr>
                                    <tr>
                                        <td className="table-td">
                                            Assignment 1 - Scoreboard Application
                                        </td>
                                        <td className="table-td">10 Mar 2023 10:58:13 PM</td>
                                        <td className="table-td">Saad Hasan</td>
                                        <td className="table-td">
                                            https://github.com/Learn-with-Sumit/assignment-1
                                        </td>
                                        <td className="table-td">100</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </AdminLayout>
    );
};

export default AssignmentMarks;
