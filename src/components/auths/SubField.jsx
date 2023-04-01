import { Link } from "react-router-dom";

const SubField = ({ to, label }) => {
    return (
        <div className="text-sm">
            <Link to={to} className="font-medium text-violet-600 hover:text-violet-500">
                {label}
            </Link>
        </div>
    );
};

export default SubField;
