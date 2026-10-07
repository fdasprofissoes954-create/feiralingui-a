import { useMemo } from "react";

function Question({
  question,
  selectedAnswer,
  answered,
  onAnswer
}) {

  const shuffledOptions = useMemo(() => {
    return [...question.options].sort(
      () => Math.random() - 0.5
    );
  }, [question]);

  return (
    <div className="question-container">

      <div className="question-number">
        DESAFIO
      </div>

      <h2>
        {question.question}
      </h2>

      <div className="answers">

        {shuffledOptions.map((option) => {

          let className = "answer-button";

          if (answered) {

            if (option === question.answer) {
              className += " correct";
            }

            else if (option === selectedAnswer) {
              className += " wrong";
            }

          }

          return (
            <button
              key={option}
              className={className}
              onClick={() => onAnswer(option)}
              disabled={answered}
            >
              {option}
            </button>
          );
        })}

      </div>

    </div>
  );
}

export default Question;