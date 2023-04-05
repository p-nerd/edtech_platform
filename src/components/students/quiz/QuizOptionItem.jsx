const QuizOptionItem = ({ label, quizNo, optionNo, addOrRemoveAnswer }) => {
    const id = `option${optionNo}_q${quizNo}`;

    return (
        <label htmlFor={id}>
            <input
                type="checkbox"
                id={id}
                onClick={() => addOrRemoveAnswer({ quizNo: quizNo - 1, optionNo: optionNo - 1 })}
            />
            {label}
        </label>
    );
};

export default QuizOptionItem;
