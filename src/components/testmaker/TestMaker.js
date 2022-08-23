import React, { useState } from 'react'
import Button from '../ui/Button'
import styles from './TestMaker.module.css'

const TestMaker = (props) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    function handleUpdateQuestion(type) {
        if (type == "prev") {
            if (currentQuestion > 0) {
                setCurrentQuestion(prev => prev - 1);
            }
        } else {
            // for next
            if (currentQuestion < props.questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            }
        }
    }

    return (
        <main className={styles.container}>
            <section className={styles.header}>
                <h3>
                    {props.details.name}
                </h3>
                <Button title="Submit" onClick={handleUpdateQuestion} />
            </section>
            <section className={styles.questions}>
                <span> Question {currentQuestion + 1} of {props.questions.length} </span>
            </section>
            <section className={styles.test_container}>
                {<props.testComponent data={props.questions[currentQuestion]} />}
            </section>
        </main>
    )
}

export default TestMaker