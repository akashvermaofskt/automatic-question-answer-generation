import React, { useEffect } from "react";

const Result = ({ state, setState }) => {
  useEffect(() => {
    if (state.Summary === "") return;

    const payload = {
      Summary: state.Summary,
    };
    fetch("http://localhost:5000/answer_list", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.QAs) setState({ ...state, QAs: data.QAs });
      });
  }, [state.Summary]);

  const displayQuestions = () => {
    if (state.QAs.length === 0) {
      return <li>Please input some text.</li>;
    } else {
      let i = 0;
      return state.QAs.map((data) => (
        <li key={i++}>
          <ul style={{ listStyle: "none" }}>
            <details>
              <summary>{data.Question} </summary>
              <p>
                <div className="bold">Original Sentence:</div>{" "}
                {data.Original_Sentence}
                <div className="bold">Answer:</div> {data.Answer}{" "}
              </p>
            </details>
          </ul>
        </li>
      ));
    }
  };

  return (
    <div className="container-fluid p-5" id="result">
      <h1>Result</h1>
      <div>
        <h3>Summary</h3>
        <p>{state.Summary}</p>
      </div>
      <div>
        <h3>Questions</h3>
        <h5>(Click on the questions to see answers)</h5>
        <ol>{displayQuestions()}</ol>
      </div>
    </div>
  );
};

export default Result;
