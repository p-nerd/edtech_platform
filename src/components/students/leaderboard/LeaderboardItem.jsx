const LeaderboardItem = ({ student, isYou }) => {
    const { name, quizMark, assignmentMark, rank } = student;
    return (
        <tr className={`${isYou ? "border-cyan border-2" : "border-b border-slate-600/50"}`}>
            <td className="table-td text-center">{rank}</td>
            <td className="table-td text-center">{name}</td>
            <td className="table-td text-center">{quizMark}</td>
            <td className="table-td text-center">{assignmentMark}</td>
            <td className="table-td text-center">{quizMark + assignmentMark}</td>
        </tr>
    );
};

LeaderboardItem.defaultProps = {
    isYou: false,
};

export default LeaderboardItem;
