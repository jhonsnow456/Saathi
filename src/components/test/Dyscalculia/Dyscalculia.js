import React, { useEffect, useState } from "react";
import styles from './Dyscalculia.module.css';
import { Button } from "@mui/material";

const Dyscalculia = (props) => {

  useEffect(() => {
    console.log(props);
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
		console.log('answer submitted');
	};

  return(
    <article className={styles.container}>
      <section>
        <h3>{props.data.questionText}</h3>
      </section>
      <section className={styles.answer_section}>
        {props.data.answerOptions.map((answerOption, i) => (
                <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)} key={i}>{answerOption.answerText}</button>
              ))}
      </section>
      <div style={{display:"flex"}}>
          <Button title="Submit" onClick={props.onSubmit} size="large" variant="contained" style={{width: "100%"}}>
              Next
          </Button>
      </div>
    </article>
  )
}

export default Dyscalculia;