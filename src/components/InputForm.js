import React, { useEffect } from "react";

const InputForm = ({ state, setState }) => {
  const submitForm = (e) => {
    e.preventDefault();
    console.log(state);
    if (Number(state.Lines) < 2) {
      alert("Please enter number of lines greater than 2.");
      return;
    }
    const payload = {
      Text: state.Text,
      Lines: state.Lines,
    };
    fetch("http://localhost:5000/summary", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        setState({ ...state, Summary: data.Summary });
      });
  };

  return (
    <form id="input" onSubmit={submitForm}>
      <div className="field">
        <label id="lb1">Input Text:</label>
        <textarea
          type="text"
          onChange={(e) => setState({ ...state, Text: e.target.value })}
        />

        <label id="lb2">
          Number of lines to summarize into (greater than 1):
        </label>
        <input
          type="number"
          onChange={(e) => setState({ ...state, Lines: e.target.value })}
        />

        <button className="btn">Summarize and generate questions</button>
      </div>
    </form>
  );
};

export default InputForm;
