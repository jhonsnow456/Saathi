import React, { useEffect, useState } from "react";
import styles from './Dyscalculia.module.css';
import { Button } from "@mui/material";
import { TYPES } from 'src/data/TEST_DYSCALCULIA';

const Dyscalculia = (props) => {

  const [answer, setAnswer] = useState({
    isCurrentCorrect: false,
    currentType: ''
  });
  const [selected, setSelected] = useState(false);
  const [finalResponse, setFinalResponse] = useState({});
  const questionTypes = TYPES;

  useEffect(() => {
  }, []);

  const handleAnswerOptionClick = (isCorrect, questionType) => {
		setAnswer({
      isCurrentCorrect : isCorrect,
      currentType : questionType
    });
    setSelected(true);
	};

  const handleSubmit = () => {

    if(!selected){
      alert('Select an option!')
      return;
    }

    if(!finalResponse[questionTypes[answer.currentType].category]){
      finalResponse[questionTypes[answer.currentType].category] = 0;
    }
    
    if(answer.isCurrentCorrect){
      finalResponse[questionTypes[answer.currentType].category]++;
    }

    setFinalResponse(finalResponse);


    //If it's the last question store the report in local storage
    if(props.index === 24){ 
      for(let category in finalResponse){
        for(let type in questionTypes){
          if(questionTypes[type].category === category){
            finalResponse[category] = (finalResponse[category]/questionTypes[type].count) * 100;
            break;
          }
        }
      }

      //finalResponse contains the percentage of questions of a particular type that are correct
      props.saveData("Dyscalculia", finalResponse);
    }

    props.onSubmit();
  }

  return(
    <article className={styles.container}>
      <section>
        { props.data.questionText && <h3>{props.data.questionText}</h3> }
        <div className={styles.question_image_container}>
        { props.data.questionImage && <img src={props.data.questionImage} alt="question-image"/> }
        </div>
      </section>
      <section className={styles.answer_section}>
        {props.data.answerOptions.map((answerOption, i) => (
          <Button 
          onClick={() => handleAnswerOptionClick(answerOption.isCorrect, props.data.questionType)} 
          key={i}
          size="medium" 
          variant="outlined"
          >{answerOption.answerText}</Button>
      ))}
      </section>
      <div style={{display:"flex"}}>
          <Button title="Submit" onClick={handleSubmit} size="large" variant="contained" style={{width: "100%"}}>
              Next
          </Button>
      </div>
    </article>
  )
}

export default Dyscalculia;