import React, { useState } from 'react'
import styles from './TestMaker.module.css'
import { styled } from '@mui/material/styles';
import {
    Card,
    Button,
    Container,
} from "@mui/material";


//styles
const Header = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    height: "10vh",
    padding: "8px",
}));

const QuestionTemplateContainer = styled('div')(({ theme }) => ({
    display: "flex",
    height: "30vh",
    padding: "8px",
}));

const ComponentContainer = styled('div')(({ theme }) => ({
    display: "flex",
    height: "80vh",
    padding: "8px",
}));



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
        <Container maxWidth="xl">
        <Header >
            <h3>
                {props.details.name}
            </h3>

            <QuestionTemplateContainer>
                <span> Question {currentQuestion + 1} of {props.questions.length} </span>
            </QuestionTemplateContainer>
            

            
        </Header>

        <ComponentContainer style={{display:"flex", flexDirection:"column", }}>              
                {<props.testComponent data={props.questions[currentQuestion]} onSubmit={handleUpdateQuestion} />}
        </ComponentContainer>
            

    </Container>
    )
}

export default TestMaker
