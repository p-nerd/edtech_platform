import { useEffect, useState } from "react";
import InputField from "../../admin/modals/InputField";
import Modal from "../../admin/modals/Modal";
import SubmitButton from "../../auths/SubmitButton";
import ConfirmModal from "../../common/ConfirmModal";
import { useAddAssignmentMarkMutation } from "../../../features/assignmentMark/assignmentMarkApi";
import { errorTost } from "../../../utils/commonUtil";

const SubmitAssignment = ({ show, onClose, assignment, student }) => {
    const [repoLink, setRepoLink] = useState("");
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

    const [addAssignmentMark, { isLoading, error }] = useAddAssignmentMarkMutation();

    useEffect(() => {
        if (error) {
            errorTost(error?.data);
        }
    }, [error]);

    useEffect(() => {
        if (isConfirm && repoLink !== "" && assignment && student) {
            addAssignmentMark({
                student_id: student?.id,
                student_name: student?.name,
                assignment_id: assignment?.id,
                title: assignment?.title,
                createdAt: new Date(),
                totalMark: assignment?.totalMark,
                mark: 0,
                repo_link: repoLink,
                status: "pending",
            });
        }
    }, [isConfirm]);

    const handleSubmit = () => {
        setOpenConfirmModal(true);
    };

    return (
        <>
            <ConfirmModal
                confirmText="Confirm Submission"
                title="Confirm Assignment Submission"
                description="If you are sure hit confirm or if not hit cancel"
                show={openConfirmModal}
                onClose={() => setOpenConfirmModal(false)}
                onConfirm={() => {
                    setIsConfirm(true);
                    setOpenConfirmModal(false);
                }}
            />
            <Modal show={show} onClose={onClose} title="Submit Assignment">
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                >
                    <InputField
                        value={repoLink}
                        setValue={setRepoLink}
                        label="Repo Link"
                        id="repo-link"
                        ph="Enter repo link *"
                    />
                    <SubmitButton disabled={isLoading} label="Submit" />
                </form>
            </Modal>
        </>
    );
};

export default SubmitAssignment;
