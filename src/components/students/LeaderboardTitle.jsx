const LeaderboardTitle = ({ isBorder }) => {
    return (
        <thead>
            <tr className={`${isBorder ? "border-b border-slate-600/50" : ""}`}>
                <th className="table-th !text-center">Rank</th>
                <th className="table-th !text-center">Name</th>
                <th className="table-th !text-center">Quiz Mark</th>
                <th className="table-th !text-center">Assignment Mark</th>
                <th className="table-th !text-center">Total</th>
            </tr>
        </thead>
    );
};

LeaderboardTitle.defaultProps = {
    isBorder: false,
};

export default LeaderboardTitle;
