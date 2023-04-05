import QuizOptionItem from "./QuizOptionItem";

const DisplayQuizItem = ({ quiz, quizNo, addOrRemoveAnswer }) => {
    return (
        <div className="quiz">
            <h4 className="question">
                Quiz {quizNo} - {quiz?.question}
            </h4>
            <form className="quizOptions">
                {quiz?.options.map((o, index) => (
                    <QuizOptionItem
                        addOrRemoveAnswer={addOrRemoveAnswer}
                        key={index}
                        label={o.option}
                        quizNo={quizNo}
                        optionNo={index + 1}
                    />
                ))}
            </form>
        </div>
    );
};

export default DisplayQuizItem;
